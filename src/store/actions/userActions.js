import { userService } from "../../services/user.service"

export function loadUser() {
  return (dispatch) => {
    const loggedUser = userService.loadUser()
    dispatch({ type: 'LOAD_USER', loggedUser })
  }
}

export function signup(userToSignup) {
  return async (dispatch) => {
    try {
      const loggedUser = userService.signup(userToSignup)
      dispatch({ type: 'SIGNUP', loggedUser })
    } catch (err) {
      console.log(err)
    }
  }
}

export function addMove(contact, amount) {
  return async (dispatch) => {
    try {
      const move = userService.addMove(contact, amount)
      dispatch({ type: 'ADD_MOVE', move })
    } catch (err) {
      console.log(err)
    }
  }
}