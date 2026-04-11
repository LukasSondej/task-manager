import { useEffect, useState} from "react"
import { Link } from "react-router-dom"
import { fetchTasks, addTask, updateTask} from "@/features/tasks/tasksSlice"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/app/store"
import { TaskForm } from "@/components/TaskForm"
import type { taskType } from "../../../backend/schemas"
import { TaskCard } from "@/components/TaskCard"
import { NavBar } from "@/components/NavBar"
import { Button } from "@/components/ui/button"
import type { Task } from "@/types"



export const TasksPage =()=>{
    const [filter , setFilter] = useState("ALL")
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null)
const dispatch = useDispatch<AppDispatch>()

const {items, isLoading, isError }=useSelector((state: RootState) => state.tasks)
useEffect(()=> {
dispatch(fetchTasks())

},[dispatch])

const onSubmitAdd = (data: taskType) => {
  dispatch(addTask(data)); 
  setIsFormOpen(false); 
}
const idEditTask = editingTask?.id
const onSubmitEdit = (data: taskType) => {
    if(!idEditTask) return null
  dispatch(updateTask({id: idEditTask, data: data})); 
  setEditingTask(null);
}

const handleChangeStatusTasks = (status: string) => {
setFilter(status)
}

if(isLoading) return <p>Loading...</p>
if(isError) return <p>Error</p>

const filteredTasks = items.filter(task => filter === "ALL" || task.status === filter)
    return (<div>
        <NavBar/>
<div>Tasks!!! </div>
<div><button onClick={()=>setIsFormOpen((prev) => !prev)}>Add task</button></div>
{isFormOpen && <TaskForm onSubmit={onSubmitAdd} onClose={() => setIsFormOpen(false)}/>}
    <Button variant={filter === "ALL" ? "default" : "outline"} onClick={() => handleChangeStatusTasks("ALL")}>ALL</Button>
    <Button variant={filter === "TODO" ? "default" : "outline"} onClick={() => handleChangeStatusTasks("TODO")}>TODO</Button>
    <Button variant={filter === "IN_PROGRESS" ? "default" : "outline"} onClick={() => handleChangeStatusTasks("IN_PROGRESS")}>IN_PROGRESS</Button>
    <Button variant={filter === "DONE" ? "default" : "outline"} onClick={() => handleChangeStatusTasks("DONE")}>DONE</Button>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {filteredTasks.map((task: Task) => <TaskCard onEditClick={setEditingTask}  key={task.id} task={task}/>)}
    </div>

{
    editingTask && (
        <div className="bg-black/40 backdrop-blur-sm fixed inset-0 z-50 flex justify-center items-center">
            <TaskForm onClose={() => setEditingTask(null)} defaultData={editingTask} onSubmit={onSubmitEdit}/>
        </div> 
    )
}
    </div> )
}
