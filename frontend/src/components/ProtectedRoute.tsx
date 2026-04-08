import { useSelector } from "react-redux"
import {type RootState } from "@/app/store"
import { Navigate } from "react-router-dom"
type Props = {
    children: React.ReactNode
}
export const ProtectedRoute = ({children}: Props) => {
const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
if(!isAuthenticated){
    return <Navigate to="/login" replace/>
}else{
    return children
}
}