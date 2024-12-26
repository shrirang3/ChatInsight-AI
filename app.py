from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import textwrap
from langchain_community.document_loaders import PDFPlumberLoader
from langchain_experimental.text_splitter import SemanticChunker
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_community.llms import Ollama
from langchain.chains import RetrievalQA
from langchain.chains.llm import LLMChain
from langchain.chains.combine_documents.stuff import StuffDocumentsChain
from langchain.prompts import PromptTemplate
from langchain.text_splitter import RecursiveCharacterTextSplitter


app = Flask(__name__)

# Enable CORS for all routes and origins
CORS(app) 



# Global variable to store vector store
global_vector_store = None

# This will load the PDF file
def load_pdf_data(file_path):
    # Creating a PyMuPDFLoader object with file_path
    loader = PDFPlumberLoader(file_path=file_path)
    
    # loading the PDF file
    docs = loader.load()
    
    # returning the loaded document
    return docs

# Responsible for splitting the documents into several chunks
def split_docs(documents, chunk_size=1000, chunk_overlap=20):
    
    # Initializing the RecursiveCharacterTextSplitter with
    # chunk_size and chunk_overlap
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap
    )
    
    # Splitting the documents into chunks
    chunks = text_splitter.split_documents(documents=documents)
    
    # returning the document chunks
    return chunks

# function for loading the embedding model
def load_embedding_model(model_path, normalize_embedding=True):
    return HuggingFaceEmbeddings(
        model_name=model_path,
        model_kwargs={'device':'cpu'}, # here we will run the model with CPU only
        encode_kwargs = {
            'normalize_embeddings': normalize_embedding # keep True to compute cosine similarity
        }
    )


# Function for creating embeddings using FAISS
def create_embeddings(chunks, embedding_model, storing_path="vectorstore"):
    # Creating the embeddings using FAISS
    vectorstore = FAISS.from_documents(chunks, embedding_model)
    
    # Saving the model in current directory
    vectorstore.save_local(storing_path)
    
    # returning the vectorstore
    return vectorstore


prompt = """
### System:
You are an AI Assistant that follows instructions extreamly well. 
Help as much as you can.

### User:
{prompt}

### Response:

"""

template = """
### System:
You are an respectful and honest assistant. You have to answer the user's \
questions using only the context provided to you. If you don't know the answer, \
just say you don't know. Don't try to make up an answer.

### Context:
{context}

### User:
{question}

### Response:
"""


# Loading orca-mini from Ollama
llm = Ollama(model="llama2", temperature=0)

# Loading the Embedding Model
embed = load_embedding_model(model_path="all-MiniLM-L6-v2")

# Creating the chain for Question Answering
def load_qa_chain(retriever, llm, prompt):
    return RetrievalQA.from_chain_type(
        llm=llm,
        retriever=retriever, # here we are using the vectorstore as a retriever
        chain_type="stuff",
        return_source_documents=True, # including source documents in output
        chain_type_kwargs={'prompt': prompt} # customizing the prompt
    )

# Prettifying the response
def get_response(query, chain):
    # Getting response from chain
    response = chain.invoke({'query': query})
    
    # Wrapping the text for better output in Jupyter Notebook
    wrapped_text = textwrap.fill(response['result'], width=100)
    return wrapped_text


@app.route('/process', methods=['GET', 'POST'])
def process_document():
    global global_vector_store


    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded", "details": "No file in request"}), 400
        
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({"error": "No selected file", "details": "Filename is empty"}), 400
    
    if not file.filename.lower().endswith('.pdf'):
        return jsonify({"error": "Invalid file type", "details": "Only PDF files are supported"}), 400
    
    # Save the file to a temporary directory
    temp_dir = "temp"
    os.makedirs(temp_dir, exist_ok=True)
    file_path = os.path.join(temp_dir, file.filename)
    file.save(file_path)

    # loading and splitting the documents
    docs = load_pdf_data(file_path)
    documents = split_docs(documents=docs)

    # creating vectorstore
    vectorstore = create_embeddings(documents, embed)

    # converting vectorstore to a retriever
    retriever = vectorstore.as_retriever()

    # Creating the prompt from the template which we created before
    prompt = PromptTemplate.from_template(template)

    # Creating the chain
    chain = load_qa_chain(retriever, llm, prompt)

    # Saving the vectorstore in global variable
    global_vector_store = vectorstore

    answer=get_response("Summarize the document uploaded", chain)
    
    return jsonify({"message": answer}), 200



@app.route('/qa', methods=['GET', 'POST'])
def question_answer():
    if global_vector_store is None:
        return jsonify({"answer": "No document processed", "details": "Please upload a document first"}), 400

    # Check if JSON data is present
    if not request.json or 'question' not in request.json:
        return jsonify({"answer": "No question provided", "details": "Please provide a valid question"}), 400

    question = request.json['question']  # Extract the question

    retriever = global_vector_store.as_retriever()
    
    # Creating the prompt from the template which we created before
    prompt = PromptTemplate.from_template(template)
    
    # Creating the chain
    chain = load_qa_chain(retriever, llm, prompt)
    print(question)
    answer=get_response(question, chain)
    print(answer)
    return jsonify({"uploaded_question": answer}), 200



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
