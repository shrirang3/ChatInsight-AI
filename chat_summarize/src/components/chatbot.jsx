import React, { useState } from 'react';
import axios from 'axios';
import CoverPg from './cover.jsx' 

export default function AIChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [file, setFile] = useState(null);

  // Handle message submission
  const  handleSubmit = async (e) => {
    e.preventDefault();

    if(!input.trim()){
      alert("Please enter a prompt");
      return;
    }
    console.log(input);
    
    try {
      const response = await axios.post(
        'http://127.0.0.1:8080/qa',
        { question: input }, // Sending JSON data
        { headers: { 'Content-Type': 'application/json' } } // JSON content type
      );
      
      console.log(response.data);

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'user', text: input },
        { sender: 'AIbot', text: response.data.uploaded_question || "Question not received by the server." }

      ]);
      setInput('');
    }
    catch(e){
      console.log(e);
    }
  };
  

  const handleFileChange = async (e) => {
    const uploadedFile = e.target.files[0];
    const query = "Summarize the key points of this document"; // Can be dynamic

    if (uploadedFile) {
      setFile(uploadedFile);
      setMessages([
        ...messages,
        { sender: 'user', text: `Uploaded: ${uploadedFile.name}` }
      ]);

      const formData = new FormData();
      formData.append('file', uploadedFile);
      formData.append('query', query);

      try {
        const response = await axios.post('http://127.0.0.1:8080/process', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        console.log(response.data);
        setMessages((prevMessages) => [
          ...prevMessages,
          { 
            sender: 'AIbot', 
            text: response.data.answer || `File processed: ${response.data.message}` 
          }
        ]);
      } catch (error) {
        console.error('Full Error:', error);
        console.log(error.status);
        console.error('Error Response:', error.response);
        setMessages((prevMessages) => [
          ...prevMessages,
          { 
            sender: 'AIbot', 
            //text: `Error: ${error.response?.data?.details || error.response?.data?.error || 'Something went wrong'}` 
          }
        ]);
      }
    }
};




// const sendQuery = async () => {
//   // e.preventDefault();
//   var prompt_input=document.getElementById("chat-input");
//   var prompt=prompt_input.value;
//   if(prompt_input==""){
//     alert("Please enter a prompt");
//     return;
//   }

//   try {
//     const res = await axios.post('http://127.0.0.1:8080/qa', formData, {
//           headers: { 'Content-Type': 'multipart/form-data' }
//     });

//     // console.log("Response status:", res.status);
//     console.log(res);
    
    
//     const responseText = await res.text();
//     console.log("Full response text:", responseText);

//     if (!res.ok) {
//       throw new Error(responseText || "Something went wrong");
//     }

//     const data = JSON.parse(responseText);
//     setResponse(data.query);
//   } catch (err) {
//     console.error("Detailed error:", err);
//     setResponse(`Error: ${err.message}`);
//   }
// };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2 className='font-jostBold text-4xl text-[#3E3FD8]'>ChatInsight AI</h2>
      </div>

      <div className="chat-window">
        <div className="chat-box">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              <p>{message.text}</p>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="chat-input-form">
        <div className="input-controls">
          <input
            type="file"
            onChange={handleFileChange}
            className="file-input"
            accept=".txt,.pdf,.docx,.jpg,.png"
          />
          <input
            type="text"
            placeholder="Type your prompt here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="chat-input"
          />
          <button type="submit" className="send-button">Send</button>
        </div>
      </form>

          <style jsx>{`
      .chat-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 90vh; /* Reduced height from 100vh */
        background-color: #f7f7f7;
        padding: 10px; /* Reduced padding */
      }
      .chat-header {
        text-align: center;
        margin-bottom: 10px; /* Reduced margin */
      }
      .chat-window {
        width: 100%;
        max-width: 1000px; /* Slightly narrower */
        height: 70%; /* Reduced height */
        background-color: white;
        overflow-y: auto;
        padding: 8px;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        margin-bottom: 10px; /* Reduced margin */
      }
      .chat-box {
        display: flex;
        flex-direction: column;
      }
      .message {
        margin-bottom: 15px;
        padding: 10px;
        border-radius: 8px;
        max-width: 80%;
      }
      .user {
        background-color: #3e4e7b;
        color: white;
        align-self: flex-end;
      }
      .AIbot {
        background-color: #f1f1f1;
        color: black;
        align-self: flex-start;
      }
      .chat-input-form {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 500px; /* Align with chat-window width */
        margin-top: 0;
      }
      .input-controls {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }
      .file-input {
        margin-right: 10px;
        padding: 5px;
      }
      .chat-input {
        flex: 1;
        padding: 8px; /* Reduced padding */
        border-radius: 5px;
        border: 1px solid #ccc;
        margin-right: 10px;
      }
      .send-button {
        padding: 8px 15px; /* Reduced size */
        background-color: #3e4e7b;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }
      .send-button:hover {
        background-color: #5b6ea5;
      }
    `}</style>

    </div>
  );
}

