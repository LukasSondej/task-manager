import { useEffect, useState} from "react"
import { Link } from "react-router-dom"
import { fetchTasks, addTask} from "@/features/tasks/tasksSlice"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/app/store"
import { TaskForm } from "@/components/TaskForm"
import type { taskType } from "../../../backend/schemas"
import { TaskCard } from "@/components/TaskCard"
import { NavBar } from "@/components/NavBar"


type Task = {
    id: number,
    title: string,
    description: string
    status: string
}
export const TasksPage =()=>{
    const [isFormOpen, setIsFormOpen] = useState(false);
const dispatch = useDispatch<AppDispatch>()

const {items, isLoading, isError }=useSelector((state: RootState) => state.tasks)
useEffect(()=> {
dispatch(fetchTasks())

},[dispatch])

const onSubmit = (data: taskType) => {
  dispatch(addTask(data)); 
  setIsFormOpen(false); 
}


if(isLoading) return <p>Loading...</p>
if(isError) return <p>Error</p>

    return (<div>
        <NavBar/>
<div>Tasks!!! </div>
<div><button onClick={()=>setIsFormOpen((prev) => !prev)}>Add task</button></div>
{isFormOpen && <TaskForm onSubmit={onSubmit} onClose={() => setIsFormOpen(false)}/>}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {items.map((task: Task) => <TaskCard key={task.id} task={task}/>)}
    </div>

<Link to={"/login"}>Login Page</Link>
    </div> )
}
