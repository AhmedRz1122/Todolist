import { useState, useEffect } from 'react'
import Navbar from './component/Navbar'
import './App.css'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [Todo, setTodo] = useState("")
  const [Todos, setTodos] = useState([])
  const [showfinish, setshowfinish] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  //saving the data to the local storage
  const saveasLS = (param) => {
    localStorage.setItem("todos", JSON.stringify(Todos))
  }


  const handleedit = (e, id) => {
    let t = Todos.filter(i => i.id === id)
    setTodo(t[0].Todo)
    let newTodos = Todos.filter(item => {
      return item.id !== id

    }
    )
    setTodos(newTodos)
    saveasLS()
  }

  const handledelete = (e, id) => {
    //let id= e.target.name;
    let index = Todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = Todos.filter(item => {
      return item.id !== id;
    });

    setTodos(newTodos);
    saveasLS();
    console.log(`The deleted id will be ${id}`)
  }
  const handleadd = () => {
    setTodos([...Todos, { id: uuidv4(), Todo, isCompleted: false }])
    setTodo("")
    console.log(Todos)
    saveasLS();
  }
  const handlechange = (e) => {
    setTodo(e.target.value)
    //  setTodos([...Todos,{Todo,isCompleted:false}])
    //  setTodo("")
  }
  const handlecheckbox = (e) => {
    let id = e.target.name;
    let index = Todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...Todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveasLS();
  }

  const toggleshowfinished = (e) => {
    setshowfinish(!showfinish)
  }


  return (
    <>
      <Navbar />
      <div className="mx-3 container md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:dw-1/2">
        <h1 className='font-bold text-center text-xl'>Mypersonalplanner - iTask</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input onChange={handlechange} value={Todo} type="text" className='w-full py-1' />
          <button onClick={handleadd} disabled={Todo.length <= 3} className='bg-blue-500 hover:bg-red-500 p-2 py-1 text-white text-sm font-bold rounded-md disabled:bg-black'>Save</button>
        </div>
        <input onChange={toggleshowfinished} type="checkbox" checked={showfinish} />
        <label className='mx-2' htmlFor="show">Show Finished</label>
        
        <h2 className='text-lg font-bold'>Your Todos</h2>
        <div className="todos inline-block mx-2">
          {Todos.length === 0 && <div className='m-5'>No Todo to display</div>}
          {Todos.map(item => {

            return (showfinish || !item.isCompleted) && <div key={item.id} className='todo flex w-full my-3 justify-between'>
              <div className='flex gap-5'></div>
              <input onChange={handlecheckbox} type="checkbox" checked={item.isCompleted} name={item.id} className='mx-3'/>
              <div className={item.isCompleted ? "line-through" : ""}>{item.Todo}</div>
              <div className="buttons flex h-full">
                <button onClick={(e) => { handleedit(e, item.id) }} className='bg-blue-500 hover:bg-red-500 p-2 py-1 text-white text-sm font-bold rounded-md mx-3'><FaEdit /></button>
                <button onClick={(e) => { handledelete(e, item.id) }} className='bg-blue-500 hover:bg-red-500 p-2 py-1 text-white text-sm font-bold rounded-md '><MdDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
