import { useForm} from "react-hook-form"
import { loginSchema, type loginSchemaType } from "../schemas/loginSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardAction, CardContent, CardDescription,CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"
import { loginUser } from "@/features/auth/authSlice"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "@/app/store"
import { toast } from "sonner"
import { Loader2, LogIn } from "lucide-react"

export const LoginPage =() => {
    const navigate = useNavigate()
   const {register, handleSubmit, formState} = useForm<loginSchemaType>({resolver: zodResolver(loginSchema),  defaultValues: {email: "", password: ""}})
   const {errors, isSubmitting} = formState
   
const dispatch = useDispatch<AppDispatch>()
const onSubmit = async(data: loginSchemaType) => {
  try{

 await dispatch(loginUser(data)).unwrap()
 toast.success("Login successful!", {
  description: "Welcome back to your Task Manager.",
 })
navigate("/tasks")
  }catch(error){
    toast.error("Login failed!", {
      description: "Please check your email and password.",
    })
console.log(error)
  }


}
const goToRegister = () => {
  navigate("/register")
}
    return (
        <div className="flex justify-center min-h-screen items-center">

        
        <Card className="w-full max-w-sm">

<CardHeader>
    <CardTitle>Login to your account</CardTitle>
     <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button variant="link" onClick={goToRegister}>Sign Up</Button>
        </CardAction>
</CardHeader>

<CardContent>

    <form onSubmit={handleSubmit(onSubmit)}>

  <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
              {...register("email")}
              />
              {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input type="password" {...register("password")} />
                   {errors.password && <span className="text-sm text-red-500">{errors.password.message}</span>}
            </div>
          </div>
    <Button type="submit" className="w-full mt-8" disabled={isSubmitting}>
      {isSubmitting ? (
        <>
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Logging in...
        </>
      ): (
        <>
                <LogIn className="w-4 h-4 mr-2" />
    Login 
        </>

      )}
   
</Button>
        </form>
</CardContent>

        </Card>
</div>
    )
}