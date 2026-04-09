import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button" 
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/app/store";
import { deleteTask, updateTask } from "@/features/tasks/tasksSlice";

type PropsTaskCard = {
    task: {
        id: number; 
        title: string;
        description?: string; 
        status: string;
    }
}

export const TaskCard = ({ task }: PropsTaskCard) => {
    const colorsTailwind = (status: string) => {
            if(status == "TODO"){ return "bg-slate-100 text-slate-700"}
              if(status == "IN_PROGRESS"){return "bg-blue-100 text-blue-700"}
              if(status == "DONE"){return "bg-green-100 text-green-700"}

    }
    const dispatch = useDispatch<AppDispatch>()
    const handleDelete = (id: number) => {
        dispatch(deleteTask(id))
    }
const handleStatusChange = (id: number, status: string) => {
        if(status == "TODO"){
            dispatch(updateTask({
                id: id, 
                data: {
                    title: task.title,             
                    description: task.description,
                    status: "IN_PROGRESS"         
                }
            }))
        }
        if(status == "IN_PROGRESS"){
            dispatch(updateTask({
                id: id, 
                data: {
                    title: task.title,             
                    description: task.description,
                    status: "DONE"              
                }
            }))
        }
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>{task.title}</CardTitle>
                <span className={`${colorsTailwind(task.status)} inline-block rounded-full px-2 py-1 text-xs`}>Status: {task.status}</span> 
            </CardHeader>

            <CardContent>
                <p>{task.description}</p>
            </CardContent>

            <CardFooter className="flex justify-between"> 
                <Button variant="destructive" onClick={()=> handleDelete(task.id)}>Delete</Button>
               {task.status == "TODO" && <Button variant="outline" onClick={()=>handleStatusChange(task.id, task.status)}>IN_PROGRESS</Button>}
               {task.status === "IN_PROGRESS" && <Button variant="outline" onClick={()=>handleStatusChange(task.id, task.status)}>DONE</Button>}
            </CardFooter>
        </Card>
    )
}