import { storageService } from './storage.service'

export const userService = {
  loadUser,
  signup,
  addMove
}

const KEY = 'user'

function loadUser() {
  const user = storageService.load(KEY) || null
  return user
}

function signup(name) {
  const user = {
    name,
    coins: 100,
    moves: []
  }
  storageService.save(KEY, user)
  return user
}

async function addMove(contact, amount) {
  const currUser = loadUser()
  if (currUser.coins - amount < 0) return
  const move = {
    toId: contact._id,
    to: contact.name,
    at: Date.now(),
    amount
  }
  currUser.moves = [...currUser.moves, move]
  currUser.coins -= amount
  storageService.save(KEY, currUser)
  return move
}