import { Component, createRef } from 'react'
import { userService } from '../services/user.service'

export class TransferFund extends Component {

  state = {
    amount: '',
    user: userService.loadUser()
  }

  btnRef = createRef()

  componentDidMount() {
    this.btnRef.current.disabled = true
  }

  handleChange = ({ target }) => {
    this.setState({ amount: target.value }, () => {
      this.btnRef.current.disabled = this.state.amount > 0 ? false : true
    })
  }

  onSubmitTransfer = (ev) => {
    ev.preventDefault()
    this.props.onTransfer(this.state.amount)
    this.setState({ amount: '' })
  }

  render() {
    const { amount } = this.state

    return (
      <div className="transfer-funds-container">
        <div className="transfer-details">
          <p>Transfer coins to {this.props.contact.name}</p>
          <form onSubmit={this.onSubmitTransfer}>
            <label htmlFor="amount">Amount:</label>
            <input onChange={this.handleChange} value={amount} type="number" min="1" id="amount" />
            <button ref={this.btnRef}>Transfer</button>
          </form>
        </div>
      </div>
    )
  }
}
