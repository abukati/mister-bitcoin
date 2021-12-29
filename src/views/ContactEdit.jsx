import { Component, createRef } from 'react'
import { connect } from 'react-redux'
import { contactService } from '../services/contact.service'
import { saveContact, getContactById } from '../store/actions/contactActions'


class _ContactEdit extends Component {

  state = {
    contact: null,
  }

  inputRef = createRef()

  async componentDidMount() {
    try {
      const contactId = this.props.match.params.id
      const contact = contactId ? await this.props.getContactById(contactId) : contactService.getEmptyContact()
      this.setState({ contact })
    } catch (err) {
      console.error(err)
    }
  }

  handleChange = ({ target }) => {
    const field = target.name
    this.setState(prevState => ({ contact: {...prevState.contact, [field]: target.value} }))
  }

  onSaveContact = async (ev) => {
    ev.preventDefault()
    const { contact } = this.state
    await this.props.saveContact({ ...contact })
    contact._id ? this.props.history.push(`/contact/${contact._id}`) : this.props.history.push('/contact')
  }

  render() {
    const { contact } = this.state

    if (!contact) return <div className="loader">Loading...</div>
    return (
      <div className="contact-edit">
        <h1 className="contact-edit-title">{ contact._id ? 'Edit' : 'Add' } contact</h1>
        <form onSubmit={this.onSaveContact} className="contact-edit-form">
          <section className="contact-edit-section">
            <label htmlFor="name">Name:</label>
            <input ref={this.inputRef} onChange={this.handleChange} value={contact.name} name="name" type="text" id="name" />
          </section>
          <section className="contact-edit-section">
            <label htmlFor="phone">Phone:</label>
            <input onChange={this.handleChange} value={contact.phone} name="phone" type="text" id="phone" min="0" />
          </section>
          <section className="contact-edit-section">
            <label htmlFor="email">Email:</label>
            <input onChange={this.handleChange} value={contact.email} name="email" type="email" id="email" />
          </section>
          <button className="btn btn-save">Save</button>
        </form>
      </div>
    )
  }
}


const mapDispatchToProps = {
  saveContact,
  getContactById
}

export const ContactEdit = connect(undefined, mapDispatchToProps)(_ContactEdit)