import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import { TasksPage } from './pages/TasksPage'
import { ProtectedRoute } from './components/ProtectedRoute'
import { RegisterPage } from './pages/RegisterPage'
import { Toaster } from 'sonner'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/tasks',
    element: (
      <ProtectedRoute>
        <TasksPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
])
function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  )
}

export default App
