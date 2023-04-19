import './App.css'; // Importing CSS file for App component
import TaskForm from "./TaskForm"; // Importing TaskForm component
import Task from "./Task"; // Importing Task component
import {useEffect, useState} from "react"; // Importing useEffect and useState hooks from React library
import { NotificationContainer, NotificationManager } from "react-notifications"; // Importing NotificationManager from react-notifications library
import "react-notifications/lib/notifications.css"; // Import the CSS for the notifications

function App() {
  const [tasks,setTasks] = useState([]); // Using useState hook to initialize tasks state with an empty array

  useEffect(() => {
    if (tasks.length === 0) return; // Checking if tasks array is empty, then return
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Saving tasks array to localStorage as JSON string
  }, [tasks]); // Running this effect whenever tasks state changes

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks')); // Retrieving tasks array from localStorage and parsing it from JSON string
    setTasks(tasks || []); // Updating tasks state with retrieved tasks array or an empty array if null
  }, []); // Running this effect only once during component mount

  function addTask(name) {
    setTasks(prev => {
      return [...prev, {name:name,done:false}]; // Adding a new task object to tasks array with provided name and done status set to false
    });
  }

  function removeTask(indexToRemove) {
    setTasks(prev => {
      NotificationManager.error("Task Removed succesuffully!");
      return prev.filter((taskObject,index) => index !== indexToRemove) ; // Removing task object from tasks array based on provided indexToRemove
    });
  }

  function updateTaskDone(taskIndex, newDone) {
    setTasks(prev => {

      const newTasks = [...prev]; // Creating a new array to prevent mutating original tasks array
      NotificationManager.warning("Task Updated succesuffully!");
      newTasks[taskIndex].done = newDone; // Updating done status of task object at provided taskIndex
      
      return newTasks; // Returning updated tasks array
    });
  }

  const numberComplete = tasks.filter(t => t.done).length; // Counting number of tasks with done status as true
  const numberTotal = tasks.length; // Getting total number of tasks

  function getMessage() {
    const percentage = numberComplete/numberTotal * 100; // Calculating percentage of completed tasks
    if (percentage === 0) {
      return 'Try to Complete your tasks! '; // Returning a message when no tasks are completed
    }
    if (percentage === 100) {
      return 'Great Job! '; // Returning a message when all tasks are completed
    }
    return 'Keep going 💪🏻'; // Returning a generic message when some tasks are completed
  }

  function renameTask(index,newName) {
    setTasks(prev => {
      const newTasks = [...prev]; // Creating a new array to prevent mutating original tasks array
      newTasks[index].name = newName; // Updating name of task object at provided index
      return newTasks; // Returning updated tasks array
    });
  }

  return (
    <main>
      
      <h2>{getMessage()}</h2>
      <h1>{numberComplete}/{numberTotal} Done</h1>
      <TaskForm onAdd={addTask} />
      <NotificationContainer /> {/* Add this line to enable notifications */}

      {tasks.map((task,index) => (
        <Task {...task}
              onRename={newName => renameTask(index,newName)}
              onTrash={() => removeTask(index)}
              onToggle={done => updateTaskDone(index, done)} /> // Rendering Task component for each task in tasks array with respective callback props
      ))}
    </main>
  );
}

export default App; // Exporting App component as
