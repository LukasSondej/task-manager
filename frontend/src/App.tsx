import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import { LoginPage } from "./pages/LoginPage"
import { TasksPage } from "./pages/TasksPage"
import { ProtectedRoute } from "./components/ProtectedRoute"
  const router = createBrowserRouter([
    {
path: "/",
element:  <Navigate to="/login" replace/>
    },
    {
      path: "/login",
      element: <LoginPage/>
    },
    {
      path: "/tasks",
      element: (<ProtectedRoute><TasksPage/></ProtectedRoute>)
    },
  ])
function App() {


  
  return (
    
    <RouterProvider router={router} />
  )
}

export default App