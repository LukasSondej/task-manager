import { useForm} from "react-hook-form"
import { loginSchema, type loginSchemaType } from "../schemas/loginSchema"
import { zodResolver } from "@hookform/resolvers/zod"



export const LoginPage =() => {
   const {register, handleSubmit} = useForm<loginSchemaType>({resolver: zodResolver(loginSchema)})
   const onSubmit =(data: loginSchemaType) => {
    console.log(data)
   }
    return (
<form onSubmit={handleSubmit(onSubmit)}>

<label htmlFor="email">Email</label>
<input type="text" {...register("email")}/>
<label htmlFor="password">Password</label>
<input type="password" {...register("password")}/>
<button type="submit">Submit</button>
</form>
    )
}