import { Controller, useForm } from "react-hook-form"
import {taskSchema, type taskType} from "../../../backend/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Button } from "./ui/button"



type TaskFormData = {
    onSubmit: (data: taskType)=> void
    defaultData?: taskType
    onClose: () => void
}
export const TaskForm =({defaultData, onSubmit, onClose}: TaskFormData)=> {

    const {register, handleSubmit, control} = useForm<taskType>({resolver: zodResolver(taskSchema),defaultValues: defaultData})

return(
 <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6 border rounded-lg shadow-sm bg-white mb-8 fixed">
        <div className="flex flex-col gap-4">

<Label htmlFor="title">Title</Label>
<Input {...register("title")}/>
<Label htmlFor="description">Description</Label>
<Input {...register("description")}/>
<Label htmlFor="description">Status</Label>

<Controller name="status" control={control} render={({field}) => (
<Select onValueChange={field.onChange} defaultValue={field.value}>
    <SelectTrigger>
      <SelectValue placeholder="Select status" />
    </SelectTrigger>
    <SelectContent>
<SelectGroup>

     <SelectItem value="TODO">To Do</SelectItem>
<SelectItem value="IN_PROGRESS">In Progress</SelectItem>
<SelectItem value="DONE">Done</SelectItem>
</SelectGroup>


    </SelectContent>
              
            </Select>
)}/>


<Button type="submit">Submit</Button>
<Button type="button" onClick={onClose}>Cancel</Button>

        </div>

    </form>)}


  
    


