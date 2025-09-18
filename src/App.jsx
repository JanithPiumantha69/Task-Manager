import react , { useState, useEffect } from "react"
import "./App.css"
import TaskForm from "./components/TaskForm"
import TaskList from "./components/TaskList"

function App() {
  //state to store tasks
  
  const [tasks, setTasks] = useState([]);

  //track local storage
  const [isLoaded, setIsLoaded] = useState(false)

  //load tasks from local storeage

  useEffect(() => {
    try{
      const savedTasks = localStorage.getItem('tasks');
    if(savedTasks && savedTasks !=='undefined'){
      setTasks(JSON.parse(savedTasks));
    }
    }catch(error){
      localStorage.removeItem('tasks');
    }finally{
      setIsLoaded(true);
    }
  },[]);

    //save tasks to local storage

    useEffect (() => {
      if (isLoaded){
        try{
          localStorage.setItem("tasks",JSON.stringify(tasks));
        }catch(error){
          console.error('Error saving tasks',error);
        }
      }
    }, [tasks]);
  

  const addTask = (taskText)=> {
    const newTask ={
      id: Date.now(), //id generating using timestamp
      text: taskText,
      completed: false,
      createdAt: new Date().toLocaleDateString()
    };
    
    //update state by creating new array with existing
    //tasks plus new task
    setTasks(prvTasks => [...prvTasks, newTask]);

  }

  const toggleTask = (taskId) => {
    setTasks(prevTask => 
      prevTask.map(task =>
        task.id === taskId 
        ? {...task, completed: !task.completed}
        : task //keep other tasks unchanged  
      )
    )
  }

  const editTask = (taskId, newText) => {
    setTasks(prevTask =>
      prevTask.map(task =>
        task.id === taskId 
        ? {...task, text: newText}
        : task 
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks(prevTask => prevTask.filter(task => task.id !== taskId));
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>📋 Personal Task Manager</h1>
        <div className='stats'>
          <span className="stat">Total:</span>
          <span className="stat completed">Completed:</span>
          <span className="stat pending">Pending:</span>

        </div>
      </header>

      <main className="app-main">
        <TaskForm onAddTask={addTask}/>
        <TaskList 
        tasks = {tasks}
        onToggleTask={toggleTask}
        onDeleteTask={deleteTask}
        onEditTask={editTask}
        />
      </main>
    </div>
  )
}

export default App
    