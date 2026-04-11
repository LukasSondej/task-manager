import { useDispatch } from "react-redux"
import { Button } from "./ui/button"
import type { AppDispatch } from "@/app/store"
import { logout } from "@/features/auth/authSlice"
import { useNavigate } from "react-router-dom"

export const NavBar = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const handleLogOut = () => {
        dispatch(logout())
    navigate("/login")
    }
    return (
   <nav className="flex justify-between items-center bg-white px-6 py-4 border-b border-slate-200 shadow-sm sticky top-0 z-40">
    <h1 className="text-xl font-bold">Task Manager</h1>
    <Button onClick={handleLogOut}>Log out</Button>
</nav>
    )
}