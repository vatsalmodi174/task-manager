import { render, screen, fireEvent } from '@testing-library/react'
import Dashboard from '../../Components/dashboard/dashboard'
import { TaskContext } from '../../context/StoreContext'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom'

const mockTasks = [
  {
    id: 1,
    title: "Test Task",
    description: "A test task",
    dueDate: "2025-04-25",
    priority: "High",
    status: "Pending",
  },
]

const setTasks = vi.fn()

const renderWithContext = () => {
  return render(
    <TaskContext.Provider value={{ tasks: mockTasks, setTasks }}>
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    </TaskContext.Provider>
  )
}

describe("Dashboard Component", () => {
  test("renders Dashboard title", () => {
    renderWithContext()
    expect(screen.getByRole("heading", { name: /dashboard/i })).toBeInTheDocument()
  })

  test("shows Create Task button", () => {
    renderWithContext()
    expect(screen.getByText(/create task/i)).toBeInTheDocument()
  })

  test("displays task title", () => {
    renderWithContext()
    expect(screen.getByText("Test Task")).toBeInTheDocument()
  })

  test("allows status change", () => {
    renderWithContext()

    const dropdown = screen.getByDisplayValue("Pending")
    fireEvent.change(dropdown, { target: { value: "Done" } })

    expect(setTasks).toHaveBeenCalled() // Status update triggers context update
  })
})