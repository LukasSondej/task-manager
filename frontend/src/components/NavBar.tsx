import { useDispatch } from 'react-redux'
import { Button } from './ui/button'
import type { AppDispatch } from '@/app/store'
import { logout } from '@/features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { ListChecks, LogOut } from 'lucide-react'
import { clearTasks } from '@/features/tasks/tasksSlice'

export const NavBar = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const handleLogOut = () => {
    dispatch(logout())
    dispatch(clearTasks())
    navigate('/login')
  }
  return (
    <nav className="flex justify-between items-center bg-white px-6 py-4 border-b border-slate-200 shadow-sm sticky top-0 z-40">
      <div className="flex items-center gap-2 text-emerald-600">
        <h1 className="text-lg sm:text-xl font-bold text-slate-900 whitespace-nowrap">
          Task Manager
        </h1>
        <ListChecks className="w-5 h-5 sm:w-7 sm:h-7" />
      </div>
      <Button variant="outline" onClick={handleLogOut} className="px-3 sm:px-4">
        <LogOut className="w-4 h-4 sm:mr-2" />
        <span className="hidden sm:inline">Log out</span>
      </Button>
    </nav>
  )
}
