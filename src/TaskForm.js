import React, { useState, useRef } from "react"; // Importing useState and useRef hooks from React library
import { NotificationManager } from "react-notifications";

function TaskForm({ onAdd }) {
  const [inputValue, setInputValue] = useState(""); // Using useState hook to initialize inputValue state with an empty string
  const inputRef = useRef(null); // Creating a ref to access the input field DOM element

  // Function to handle voice input
  const handleVoiceInput = (event) => {
    setInputValue(event.results[0][0].transcript); // Updating inputValue state with the transcribed voice input
  };

  // Function to handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== "") {
      onAdd(inputValue);
      setInputValue("");
      NotificationManager.success("Task added successfully!"); // Show success notification
    } else {
      NotificationManager.error("Please enter a task!"); // Show error notification
    }
  };

  // Function to start voice recognition
  const startVoiceRecognition = () => {
    if (window.hasOwnProperty("webkitSpeechRecognition")) {
      // Checking if browser supports SpeechRecognition API
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = "en-US"; // Setting language for voice recognition
      recognition.continuous = false; // Setting continuous to false to recognize only once
      recognition.interimResults = false; // Setting interimResults to false to get only final results
      recognition.onresult = handleVoiceInput; // Setting event handler for voice recognition results
      recognition.start(); // Starting voice recognition
    } else {
      console.log("Speech recognition not supported in this browser.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        ref={inputRef}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a task..."
      />
      <button type="submit">Add Task</button>
      <button type="button" onClick={startVoiceRecognition}>
        Start Voice Recognition
        <svg  className="record" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M192 0C139 0 96 43 96 96V256c0 53 43 96 96 96s96-43 96-96V96c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 70.7-57.3 128-128 128s-128-57.3-128-128V216z"/></svg>
      </button>
    </form>
  );
}

export default TaskForm; // Exporting TaskForm component
