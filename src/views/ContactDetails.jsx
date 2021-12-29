import { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { ContactPreview } from '../cmps/ContactPreview'
import { MovesList } from '../cmps/MovesList'
import { TransferFund } from '../cmps/TransferFund'
import { getContactById, removeContact } from '../store/actions/contactActions'
import { userService } from '../services/user.service'

class _ContactDetails extends Component {

  state = {
    contact: null,
    isOpts: false
  }

  componentDidMount() {
    this.loadContact()
  }

  componentDidUpdate(prevProps, prevState) {   
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.loadContact()
    }   
  }
  
  async loadContact() {
    const contact = await this.props.getContactById(this.props.match.params.id)
    this.setState({ contact })
  }

  removeContact = async () => {
    await this.props.removeContact(this.state.contact._id)
    this.goBack()
  }

  toggleModal = () => {
    this.setState(prevState => ({ isOpts: !prevState.isOpts }))
  }

  goBack = () => {
    this.props.history.push('/contact')
  }

  onTransfer = (amount) => {
    userService.addMove(this.state.contact, amount)
  }

  render() {
    const { contact, isOpts } = this.state
    const user = userService.loadUser()

    if (!contact) return <div className="loader">Loading...</div>
    return (
      <div className="contact-details">
        <div className="details-header">
          <button onClick={this.goBack} className="btn btn-back">Back</button>
          <span onClick={this.toggleModal} className="contact-options">
            ...
            { isOpts && <>
              <Link to={`/contact/edit/${contact._id}`}>Edit</Link>
              <button onClick={this.removeContact} className="btn btn-remove">X</button>
            </> }
          </span>
        </div>
        <ContactPreview contact={contact} />
        <TransferFund onTransfer={this.onTransfer} contact={contact} />
        <MovesList user={user} contact={contact} />
      </div>
    )
  }
}


const mapDispatchToProps = {
  getContactById,
  removeContact
}

export const ContactDetails = connect(undefined, mapDispatchToProps)(_ContactDetails)