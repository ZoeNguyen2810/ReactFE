
import { useStore , actions } from "./store"


function App() {
  const [state, dispatch] = useStore()
  const { todos, todoInput } = state
  console.log(state)

  const handleAdd = () => {
    dispatch(actions.addTodo(todoInput))
  }
 
  console.log(state)
  console.log(todos)
  return(
    <div>
    
    <input value={todoInput}
    placeholder="Enter..." onChange={e => {
      dispatch(actions.setTodoInput(e.target.value))
    }}/>
    <button onClick={handleAdd}>
      Add
    </button>
  
    {todos.map((todo , index) => (
      <li key={index}>{todo}</li>
    ))}
    
    </div>
  )

}
export default App