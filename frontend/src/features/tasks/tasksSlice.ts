import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import instanceAxios from '../../api/axios'
import type { taskSchemaType } from '@/schemas/taskSchema'
import type { Task } from '@/types'
const fetchTasks = createAsyncThunk('tasks/fetchAll', async () => {
  const response = await instanceAxios.get('/tasks')
  return response.data
})
const addTask = createAsyncThunk('tasks/addTask', async (newTask: taskSchemaType) => {
  const response = await instanceAxios.post('/tasks', newTask)
  return response.data
})
const deleteTask = createAsyncThunk('tasks/deleteTask', async (id: number) => {
  await instanceAxios.delete('/tasks/' + id)
  return id
})
type UpdateTaskType = {
  title?: string
  description?: string
  status?: 'TODO' | 'IN_PROGRESS' | 'DONE'
}
const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (dataTask: { id: number; data: UpdateTaskType }) => {
    await instanceAxios.put('/tasks/' + dataTask.id, dataTask.data)
    return { id: dataTask.id, ...dataTask.data }
  },
)

type TasksState = {
  items: Task[]
  isLoading: boolean
  isError: boolean
}
const initialState: TasksState = {
  items: [],
  isLoading: false,
  isError: false,
}
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    clearTasks: (state) => {
      state.items = []
      state.isError = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.items = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchTasks.pending, (state) => {
      state.isLoading = true
      state.isError = false
    })
    builder.addCase(fetchTasks.rejected, (state) => {
      state.isError = true
      state.isLoading = false
    })
    builder.addCase(addTask.fulfilled, (state, action) => {
      state.items.unshift(action.payload)
    })
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.items = state.items.filter((task) => task.id !== action.payload)
    })
    builder.addCase(updateTask.fulfilled, (state, action) => {
      const index = state.items.findIndex((task) => task.id == action.payload.id)
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload }
      }
    })
  },
})
export const { clearTasks } = tasksSlice.actions
export { fetchTasks }
export { addTask }
export { deleteTask }
export { updateTask }
export default tasksSlice.reducer
