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
                <CardDescription>Status: {task.status}</CardDescription> 
            </CardHeader>

            <CardContent>
                <p>{task.description}</p>
            </CardContent>

            <CardFooter className="flex justify-between"> 
                <Button variant="destructive" onClick={()=> handleDelete(task.id)}>Delete</Button>
                <Button variant="outline" onClick={()=>handleStatusChange(task.id, task.status)}>Change status</Button>
            </CardFooter>
        </Card>
    )
}