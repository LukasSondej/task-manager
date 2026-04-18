import { describe, it, expect } from 'vitest'
import tasksReducer, { clearTasks } from './tasksSlice'

describe('Tasks Tests', () => {
  it('checks initial state (empty list)', () => {
    const state = tasksReducer(undefined, { type: 'unknown' })
    expect(state.items).toEqual([])
    expect(state.isLoading).toBe(false)
  })

  it('clears all tasks on logout', () => {
    const stateWithTasks = {
      items: [{ id: 1, title: 'Testing' }],
      isLoading: false,
      isError: false,
    }

    const newState = tasksReducer(stateWithTasks as any, clearTasks())

    expect(newState.items).toEqual([])
  })
})
