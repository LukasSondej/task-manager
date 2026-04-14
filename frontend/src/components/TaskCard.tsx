import { Card, CardContent,CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button" 
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/app/store";
import {deleteTask, updateTask } from "@/features/tasks/tasksSlice";
import type { Task } from "@/types";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog"
import {Trash2Icon } from "lucide-react";
type PropsTaskCard = {
    task: Task
    onEditClick: (task: Task) => void
}

export const TaskCard = ({ task, onEditClick }: PropsTaskCard) => {

const colorsTailwind = (status: string) => {
    if(status === "TODO") return "bg-slate-200 text-slate-800 font-semibold"
    if(status === "IN_PROGRESS") return "bg-blue-100 text-blue-800 font-semibold"
    if(status === "DONE") return "bg-emerald-100 text-emerald-800 font-semibold"
}
    const dispatch = useDispatch<AppDispatch>()
    const handleDelete = async(id: number) => {
        try{
   await dispatch(deleteTask(id)).unwrap()
        toast.info("Task has been deleted.");
        }catch(error){
toast.error("Failed to delete task.");
        }
    
    }
const handleStatusChange = async(id: number, status: string) => {
try{
        if(status == "TODO"){
           await dispatch(updateTask({
                id: id, 
                data: {
                    title: task.title,             
                    description: task.description,
                    status: "IN_PROGRESS"         
                }
            })).unwrap()
toast.success("Task is now In Progress!");
        }
        if(status == "IN_PROGRESS"){
           await dispatch(updateTask({
                id: id, 
                data: {
                    title: task.title,             
                    description: task.description,
                    status: "DONE"              
                }
            })).unwrap()
            toast.success("Task completed! Great job!");
        }

}catch(error){
    toast.error("Failed to change status.");
}

    }
  

   
 return  (<Card className="bg-white border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 rounded-xl flex flex-col h-full">
            <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-900">{task.title}</CardTitle>
                <span className={`${colorsTailwind(task.status)} inline-block rounded-full px-2 py-1 text-xs`}>Status: {task.status}</span> 
            </CardHeader>

            <CardContent>
       <p className="text-sm text-slate-700 mt-2">{task.description}</p>
            </CardContent>

<CardFooter className="flex justify-between items-center gap-2 mt-auto pt-4 border-t border-slate-100"> 
    <div className="flex gap-2">
        <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete Task?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this task.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={() => handleDelete(task.id)}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
<Button variant="outline" size="sm" onClick={() => onEditClick(task)}>
    
    Edit
</Button>
    </div>
    <div className="flex gap-2">
    {task.status === "TODO" && (
<Button 
    className="bg-slate-600 hover:bg-slate-700 text-white shadow-sm" 
    size="sm" 
    onClick={()=>handleStatusChange(task.id, task.status)}
>
    Start Task
</Button>
    )}
    {task.status === "IN_PROGRESS" && (
<Button className="bg-emerald-600 hover:bg-emerald-700 text-white" size="sm" onClick={()=>handleStatusChange(task.id, task.status)}>
                Finish
            </Button>
    )}
</div>
</CardFooter>
        </Card>
 )


   
      
      
    
}