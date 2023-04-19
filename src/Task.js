import Checkbox from "./Checkbox"; // Import the Checkbox component from a local file "./Checkbox"
import {useState} from "react"; // Import the useState hook from the "react" library

// Define a functional component called Task with props: name, done, onToggle, onTrash, onRename
export default function Task({name,done,onToggle,onTrash,onRename}) {
  // Use the useState hook to manage the state of editMode and setEditMode function, initial state is set to false
  const [editMode,setEditMode] = useState(false);
  return (
    <div className={'task ' + (done?'done':'')}>
      <Checkbox checked={done} onClick={() => onToggle(!done)}  />
      {!editMode && (
        <div className="task-name" onClick={() => setEditMode(prev => !prev)}>
          <span>{name}</span>
        </div>
      )}
      {editMode && (
        <form onSubmit={ev => {ev.preventDefault();setEditMode(false);}}>
          <input type="text" value={name}
                 onChange={ev => onRename(ev.target.value)} />
        </form>
      )}
      <button className="trash" onClick={onTrash}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
      </button>
    </div>
  );
}

 // Render a div element with a class "task" and conditionally add "done" class based on the value of "done" prop
  // Render a Checkbox component with checked prop set to "done" prop and onClick event handler calling the "onToggle" function
  // Render a div element with a class "task-name" and an onClick event handler that toggles the "editMode" state
  // Render a span element with the "name" prop as its content
  // Render a form element with an onSubmit event handler that prevents default form submission behavior
  // Render an input element with a type of "text" and value set to "name" prop, with onChange event handler calling the "onRename" function
  // Render a button element with a class "trash" and an onClick event handler calling the "onTrash" function
  // Render an SVG icon for trash icon using path element with a path data defining the shape of the icon
