import React, { useState, useEffect } from 'react'
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';


interface Todo {
    id: string;
    todo: string;
    isCompleted: boolean;
  }

function Container() {

    const [todo, setTodo] = useState<string>("");
    const [todos, setTodos] = useState<Todo[]>([]);
    const [showFinished, setShowFinished] = useState<boolean>(true);
  
    useEffect(() => {
      const todoString = localStorage.getItem("todos");
      if (todoString) {
        const storedTodos: Todo[] = JSON.parse(todoString);
        setTodos(storedTodos);
      }
    }, []);
  
    const saveToLS = () => {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  
    const toggleFinished = () => {
      setShowFinished(!showFinished);
    }
  
    const handleEdit = (id: string) => {
      const editedTodo = todos.find(todo => todo.id === id);
      if (editedTodo) {
        setTodo(editedTodo.todo);
        const newTodos = todos.filter(todo => todo.id !== id);
        setTodos(newTodos);
        saveToLS();
      }
    }
  
    const handleDelete = (id: string) => {
      const newTodos = todos.filter(todo => todo.id !== id);
      setTodos(newTodos);
      saveToLS();
    }
  
    const handleAdd = () => {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
      setTodo("");
      saveToLS();
    }
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTodo(e.target.value);
    }
  
    const handleCheckbox = (id: string) => {
      const newTodos = todos.map(todo =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      );
      setTodos(newTodos);
      saveToLS();
    }

  return (
    <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-orange-200 min-h-[80vh] md:w-[50%]">
        <h1 className="flex justify-center font-bold text-3xl mb-5">Add a To-Do</h1>
        <div className="flex">
            <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1' />
            <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-orange-500 mx-2 rounded-full hover:bg-orange-700 disabled:bg-orange-300 p-4 py-2 text-sm font-bold text-white'>Save</button>
        </div>
        <input className='my-4' id='show' onChange={toggleFinished} type="checkbox" checked={showFinished} />
        <label className='mx-2' htmlFor="show">Show Finished</label>
        <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
        <h2 className='text-2xl font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Todos to display</div>}
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className={"todo flex my-3 justify-between"}>
              <div className='flex gap-5'>
                <input name={item.id} onChange={() => handleCheckbox(item.id)} type="checkbox" checked={item.isCompleted} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={() => handleEdit(item.id)} className='bg-orange-500 hover:bg-orange-700 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit /></button>
                <button onClick={() => handleDelete(item.id)} className='bg-orange-500 hover:bg-orange-700 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><AiFillDelete /></button>
              </div>
            </div>
          })}
        </div>
    </div>
  )
}

export default Container