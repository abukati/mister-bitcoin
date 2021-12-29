import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { signup } from '../store/actions/userActions'

export const Signup = () => {

  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const history = useHistory()

  const handleChange = ({ target }) => {
    setName(target.value)
  }

  const onSignup = (ev) => {
    ev.preventDefault()
    dispatch(signup(name))
    history.push('/')
  }

  return (
    <div className="signup-page">
      <h1 className="signup-title">Sign up</h1>
      <form onSubmit={onSignup}>
        <label htmlFor="name">Please enter your name</label>
        <input onChange={handleChange} type="text" id="name" value={name} />
        <button>Sign up</button>
      </form>
    </div>
  )
}