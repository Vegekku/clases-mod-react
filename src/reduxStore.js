import {createStore} from 'redux'

// Standar FSA
const rootReducer = (state, action) => {
  switch (action.type) {
    case 'INCR':
      return {...state, count: state.count + 1}
    case 'DECR':
      return {...state, count: state.count - 1}
    case 'ADD':
      return {...state, count: state.count + action.payload.value}
    default:
      return state
  }
}

const add = qty => ({type: 'ADD', payload: {}})
const incr = () => ({type: 'INCR'})
const decr = () => ({type: 'DECR'})

const store = createStore(rootReducer)

// window.store = store

store.subscribe(() => console.log('debug:', store.getState()))

export default store

export { add, incr, decr }