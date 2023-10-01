import { SET_TODO_INPUT , ADD_TODO} from "./contstans";


export const setTodoInput = payload => ({
    type : SET_TODO_INPUT,
    payload
})

export const addTodo = payload => ({
    typeof : ADD_TODO,
    payload
})