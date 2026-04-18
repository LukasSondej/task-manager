import { useEffect, useState } from 'react'
import { fetchTasks, addTask, updateTask } from '@/features/tasks/tasksSlice'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/app/store'
import { TaskForm } from '@/components/TaskForm'
import { TaskCard } from '@/components/TaskCard'
import { NavBar } from '@/components/NavBar'
import { Button } from '@/components/ui/button'
import type { Task } from '@/types'
import { toast } from 'sonner'
import type { taskSchemaType } from '@/schemas/taskSchema'
import { PlusCircle, X } from 'lucide-react'

export const TasksPage = () => {
  const [filter, setFilter] = useState('ALL')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const dispatch = useDispatch<AppDispatch>()

  const { items, isLoading, isError } = useSelector((state: RootState) => state.tasks)

  useEffect(() => {
    dispatch(fetchTasks())
  }, [dispatch])

  const onSubmitAdd = async (data: taskSchemaType) => {
    try {
      await dispatch(addTask(data)).unwrap()
      toast.success('Task has been created successfully')
      setIsFormOpen(false)
    } catch (error) {
      toast.error('An error occurred while adding the task.')
    }
  }

  const idEditTask = editingTask?.id
  const onSubmitEdit = async (data: taskSchemaType) => {
    if (!idEditTask) return null
    try {
      await dispatch(updateTask({ id: idEditTask, data: data })).unwrap()
      toast.success('Task has been updated successfully')

      setEditingTask(null)
    } catch (error) {
      toast.error('An error occurred while editing.')
    }
  }

  const handleChangeStatusTasks = (status: string) => {
    setFilter(status)
  }

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error</p>

  const filteredTasks = items.filter((task) => filter === 'ALL' || task.status === filter)
  const defaultTaskData = editingTask
    ? {
        title: editingTask.title,
        description: editingTask.description,
        status: editingTask.status as 'TODO' | 'IN_PROGRESS' | 'DONE',
      }
    : undefined

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <NavBar />

      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-200">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 whitespace-nowrap">
            My Tasks
          </h1>

          <Button
            onClick={() => setIsFormOpen((prev) => !prev)}
            className={
              isFormOpen
                ? 'bg-slate-200 hover:bg-slate-300 text-slate-800 px-4 py-4 sm:px-6 sm:py-6 text-sm sm:text-lg rounded-xl transition-all'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-4 sm:px-8 sm:py-6 text-sm sm:text-lg font-bold shadow-md rounded-xl transition-all hover:scale-105'
            }
          >
            {isFormOpen ? (
              <>
                <X className="w-5 h-5 mr-2" /> Cancel
              </>
            ) : (
              <>
                <PlusCircle className="w-5 h-5 mr-2" /> Add Task
              </>
            )}
          </Button>
        </div>

        {isFormOpen && (
          <div className="mb-8">
            <TaskForm onSubmit={onSubmitAdd} onClose={() => setIsFormOpen(false)} />
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={filter === 'ALL' ? 'default' : 'outline'}
            onClick={() => handleChangeStatusTasks('ALL')}
          >
            All
          </Button>
          <Button
            variant={filter === 'TODO' ? 'default' : 'outline'}
            onClick={() => handleChangeStatusTasks('TODO')}
          >
            To Do
          </Button>
          <Button
            variant={filter === 'IN_PROGRESS' ? 'default' : 'outline'}
            onClick={() => handleChangeStatusTasks('IN_PROGRESS')}
          >
            In Progress
          </Button>
          <Button
            variant={filter === 'DONE' ? 'default' : 'outline'}
            onClick={() => handleChangeStatusTasks('DONE')}
          >
            Done
          </Button>
        </div>

        {filteredTasks.length === 0 ? (
          <p className="text-center text-slate-500 mt-12 text-lg">
            No tasks found. Click "+ Add Task" to create one.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <TaskCard onEditClick={setEditingTask} key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>

      {editingTask && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-slate-900/40 p-4">
          <TaskForm
            onClose={() => setEditingTask(null)}
            defaultData={defaultTaskData}
            onSubmit={onSubmitEdit}
          />
        </div>
      )}
    </div>
  )
}
