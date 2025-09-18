import {useState} from "react";

function TaskItem ({task, onToggle, onDelete, onEdit}){
    //local state to manage task
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.text);

    const handleCancel = ()=> {
        setEditText(task.text); //reset to original text
        setIsEditing(false);
    }

    const handleSave = ()=> {
        const trimmedText = editText.trim();
        if(trimmedText && trimmedText !== task.text){
            onEdit(task.id, trimmedText);
        }
            setIsEditing(false);
    }

    return(
        <div className={`task-item ${task.completed ? 'completed' : ''}`}>
            <input 
            type="checkbox"
            checked={task.completed}
            onChange={()=> onToggle(task.id)}
            className="task-checkbox" 
            />

            <div className="task-content">
                {isEditing ? (
                    //show input field
                    <input
                     type="text"
                     value={editText}
                     className="edit-input"
                     maxLength={100}
                     onChange={(e) => setEditText(e.target.value)}
                     autoFocus
                     />
                ) : (
                    //show task text
                    <div className="task-text-container">
                        <span className="task-text">{task.text}</span>
                        <span className="task-date">{task.createdAt}</span>

                    </div>
                )}
                
            </div>

            <div className="task-actions">
                {isEditing ? (
                    //edit mode
                    <>
                    <button
                        className="save-btn"
                        title="Save Changes"
                        onClick={handleSave}
                    >
                        ✅
                    </button>
                    <button
                        className="cancel-btn"
                        title="Cancel Editing"
                        onClick={handleCancel}
                    >❌</button>
                    </>

                    ) : (
                        //view mode
                        <>
                        <button onClick={()=>setIsEditing(true)} className="edit-btn" title="Edit Task" disabled={task.completed} >✏️</button>
                        <button onClick={()=> onDelete(task.id)} className="delete-btn" title="Delete Task">🗑️</button>
                       </>
                    )}
            </div>
        </div> 
    )



}

export default TaskItem