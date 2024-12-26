
# ChatInsight AI : RAG based PDF Chat-Bot 📌💥🔍️

ChatInsight AI-Full-Stack App features:  

⭐ **Summarizes your PDFs intelligently**  
↪  **Provides Source References**   
🗣 **Chat with your PDFs in natural language**  


Say goodbye to manual searches—get answers instantly! 🚀
## Technologies 🧑‍💻



- **Flask**: A lightweight Python web framework used for building the backend API, facilitating efficient communication between the frontend and backend.
- **React**: A JavaScript library for creating dynamic, responsive, and user-friendly interfaces on the frontend.
- **Ollama’s Llama2**: A powerful large language model (LLM) employed to generate contextual responses and enable intelligent conversations with uploaded PDFs.
- **LangChain**: A framework designed to simplify the creation of applications using LLMs, integrating the RAG (Retrieval-Augmented Generation) approach for effective document retrieval and generation.
- **Tailwind CSS**: A utility-first CSS framework that allows rapid and customizable styling of components for a responsive and clean user interface.
- **FAISS**: A highly efficient vector search engine used to store document embeddings and perform fast similarity searches, enabling quick retrieval of relevant document content for response generation.

These technologies work together to create a robust PDF chatbot application that allows for document summarization, question answering, and interactive conversations with uploaded PDFs.

## Getting Started 📝

Follow the below steps to run the repository:

**Clone repository:**

```bash
  git clone https://github.com/shrirang3/ChatInsight-AI.git
```

**Install dependancies:**

```bash
  cd chat_summarize
  pip install -r requirements.txt
  ```

**Ollama Installation** (Open-Source Approach) 🚀 [OPTION A]

-Download the Ollama installer from the [Ollama Website](https://ollama.com/download).

-Run the installer and follow the setup instructions.



- Download the Llama2 Model  
    
    ```bash
    ollama pull llama2
    ```

**Using Open AI API** 🚀 [OPTION B]

Setup the .env file using OPENAI_API_KEY

- **`OPENAI_API_KEY`**  
  - Your OpenAI API key for accessing language models.  
  - Get your API key by logging into the [OpenAI Platform](https://platform.openai.com/account/api-keys). 

**Start Flask backend** 🚨

```bash
  python app.py
  ```

**In new Terminal Start React Frontend:** 📌

```bash
cd chat_summarize
```

```bash
npm install
npm run dev
```

Make sure, the React Application runs at localhost:5173 and the Flask Backend runs at localhost:8080

## Usage 📱

- **Upload PDF**: Start by uploading a valid PDF document to process and analyze its content.  
- **Chat with the PDF**: Ask questions based on the uploaded document, and get accurate, context-aware responses.  

## License 📄

This Project is Lisenced under [MIT](https://github.com/shrirang3/ChatInsight-AI/blob/master/LICENSE)





## Acknowledgements 👥

 - [Langchain Resources](https://python.langchain.com/docs/tutorials/rag/)
 - [Flask Documentation](https://flask.palletsprojects.com/en/stable/)
 - [RAG Theory](https://cloud.google.com/use-cases/retrieval-augmented-generation)
 - [FAISS Database](https://python.langchain.com/docs/integrations/vectorstores/faiss/)

