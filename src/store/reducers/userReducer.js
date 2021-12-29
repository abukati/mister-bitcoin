const INITIAL_STATE = {
  loggedUser: {
    name: null,
    coins: null,
    moves: []
  }
}

export function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SIGNUP':
      return {
        ...state,
        loggedUser: { ...action.loggedUser }
      }

    case 'ADD_MOVE':
      const { loggedUser, moves } = this.state
      return {
        ...state,
        loggedUser: { ...loggedUser, coins: loggedUser.coins - action.move.amout, moves: [...moves, action.move] }
      }

    case 'LOAD_USER':
      return {
        ...state,
        loggedUser: { ...action.loggedUser}
      }

    default:
      return state
  }
}