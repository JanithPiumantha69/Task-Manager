import React,{ useState } from "react";

function TaskForm({onAddTask}){
    const [inputValue, setInputValue] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();  //prevent page refresh on form submit

        //trim whitespace and check is input is not empty
        const trimmedValue = inputValue.trim();
        if(trimmedValue){
            onAddTask(trimmedValue);
            setInputValue(''); 
        }
    }

    //handle input changes
    const handleInputChange =(e)=>{
        setInputValue(e.target.value);
    }


    return(
        <form className="task-form" onSubmit={handleSubmit}>
         <div className="input-group">
            <input
            className="task-input"
            value={inputValue}
            onChange={handleInputChange}
            type="text"
            placeholder="What need to be done..."
            maxLength={100}
            />
            <button
            type="submit"
            className="add-btn"
            >
                Add Task
            </button>
            
         </div>
        </form>
    )
}

export default TaskForm

    