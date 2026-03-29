import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import { LoginPage } from "./pages/LoginPage"
import { TasksPage } from "./pages/TasksPage"

function App() {
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

  
  return (
    
    <RouterProvider router={router} />
  )
}

export default App