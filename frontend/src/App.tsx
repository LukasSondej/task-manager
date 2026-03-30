import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import { LoginPage } from "./pages/LoginPage"
import { TasksPage } from "./pages/TasksPage"
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
      element: <TasksPage/>
    },
  ])
function App() {


  
  return (
    
    <RouterProvider router={router} />
  )
}

export default App