import { useForm } from "react-hook-form"
import {taskSchema, type taskType} from "../../../backend/schemas"
import { zodResolver } from "@hookform/resolvers/zod"


type TaskFormData = {
    onSubmit: (data: taskType)=> void
    defaultData?: taskType
    onClose: () => void
}
export const TaskForm =({defaultData, onSubmit, onClose}: TaskFormData)=> {

    const {register, handleSubmit} = useForm<taskType>({resolver: zodResolver(taskSchema),defaultValues: defaultData})

return(
    <form onSubmit={handleSubmit(onSubmit)}>
<label htmlFor="title">Title</label>
<input {...register("title")}/>
<label htmlFor="description">Description</label>
<input {...register("description")}/>
<label htmlFor="description">Status</label>
<select id="status" {...register("status")}>
                <option value="TODO">To DO</option>
                <option value="doing">Doing</option>
                <option value="done">Done</option>
            </select>
<button type="submit">Submit</button>
<button type="button" onClick={onClose}>Cancel</button>
    </form>
)
}
