import { useEffect} from "react"
import { Link } from "react-router-dom"
import { fetchTasks } from "@/features/tasks/tasksSlice"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/app/store"
export const TasksPage =()=>{
const dispatch = useDispatch<AppDispatch>()
type Task = {
    id: number,
    title: string,
    description: string
    status: string
}
const {items, isLoading, isError }=useSelector((state: RootState) => state.tasks)
useEffect(()=> {
dispatch(fetchTasks())

},[dispatch])
if(isLoading) return <p>Loading...</p>
if(isError) return <p>Error</p>
    return (<div>
<div>Tasks!!! </div>
{items.map((task: Task) => (<div><h1>{task.title}</h1><p>{task.description}</p><h2>{task.status}</h2></div>))}
<Link to={"/login"}>Login Page</Link>
    </div> )
}
