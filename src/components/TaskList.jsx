import React from "react";
import TaskItem from "./TaskItem";

function TaskList({tasks, onEditTask, onDeleteTask, onToggleTask}){
    return(
        <div className="task-list">
            {tasks.map(task => (
                  <TaskItem 
                  key={task.id}
                  task={task}
                  onEdit={onEditTask}
                  onDelete={onDeleteTask}
                  onToggle={onToggleTask}
                  />
            ))}
            
        </div>
    )


}
    
export default TaskList;
