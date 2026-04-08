import { useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardAction, CardContent, CardDescription,CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"
import instanceAxios from "../api/axios"
import {type registerSchemaType, registerSchema } from "@/schemas/registerSchema"


export const RegisterPage =() => {
    const navigate = useNavigate()
   const {register, handleSubmit} = useForm<registerSchemaType>({resolver: zodResolver(registerSchema),  defaultValues: {email: "", password: "", confirmPassword: ""}})
const onSubmit = async(data: registerSchemaType) => {
  try{
await instanceAxios.post("/user", {
    email: data.email,
    password: data.password
})
navigate("/login");
  }catch(error){
console.log(error)
  }


}
const goToLoginPage = () => {
  navigate("/login")
}
    return (
        <div className="flex justify-center min-h-screen items-center">

        
        <Card className="w-full max-w-sm">

<CardHeader>
    <CardTitle>Register</CardTitle>
     <CardDescription>
     Enter your details below to create an account
        </CardDescription>
        <CardAction>
          <Button variant="link" onClick={goToLoginPage}>Log in</Button>
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
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input type="password" {...register("password")} />
               <div className="flex items-center">
                <Label htmlFor="password">Confirm Password</Label>
              </div>
               <Input type="password" {...register("confirmPassword")} />
            </div>
          </div>
           <Button type="submit" className="w-full mt-8">
          Register
        </Button>
        </form>
</CardContent>

        </Card>
</div>
    )
}