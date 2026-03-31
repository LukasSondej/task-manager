import { createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import  instanceAxios  from '../../api/axios'
const fetchTasks = createAsyncThunk(
  'tasks/fetchAll',
  async () => {
    const response = await instanceAxios.get("/tasks")
    return response.data
  },
)
const addTask = createAsyncThunk(
  'tasks/addTask',
  async(newTask: {title: string, description: string})=>{
const response = await instanceAxios.post("/tasks", newTask)
return response.data
  }
)
type Task = {
    id: number
    title: string,
    description: string,
    status: string
}
type TasksState = {
items: Task[],
isLoading: boolean,
isError: boolean
}
const initialState: TasksState = {
    items: [],
isLoading: false,
isError: false
}
const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {

      state.items = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchTasks.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false
    })
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.isError = true
      state.isLoading = false
    })
    builder.addCase(addTask.fulfilled, (state, action) => {
        state.items.push(action.payload)
    })
  },
})
export { fetchTasks }; 
export default tasksSlice.reducer;