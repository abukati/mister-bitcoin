import { contactService } from "../../services/contact.service"

export function loadContacts() {
  return async (dispatch, getState) => {
    const { filterBy } = getState().contactModule
    try {
      const contacts = await contactService.getContacts(filterBy)
      console.log('loading');
      dispatch({ type: 'SET_CONTACTS', contacts })
    } catch (err) {
      console.log(err)
    }
  }
}

export function saveContact(contactToSave) {
  return async (dispatch) => {
    try {
      const contact = await contactService.saveContact(contactToSave)
      contactToSave._id ? dispatch({ type: 'UPDATE_CONTACT', contact }) : dispatch({ type: 'ADD_CONTACT', contact })
    } catch (err) {
      console.log(err)
    }
  }
}

export function removeContact(contactId) {
  return async (dispatch) => {
    try {
      await contactService.removeContact(contactId)
      dispatch({ type: 'REMOVE_CONTACT', contactId })
    } catch (err) {
      console.log(err)
    }
  }
}

export function setFilterBy(filterBy) {
  return async (dispatch) => {
    dispatch({ type: 'SET_FILTER_BY', filterBy })
  }
}

export function getContactById(contactId) {
  return async () => {
    return await contactService.getContactById(contactId)
  }
}