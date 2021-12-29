import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ContactFilter } from '../cmps/ContactFilter'
import { ContactList } from '../cmps/ContactList'
import { loadContacts, setFilterBy } from '../store/actions/contactActions'

export const ContactPage = () => {

  const { contacts } = useSelector(state => state.contactModule)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadContacts())
  }, [dispatch])

  const onFilter = useCallback((filterBy) => {
    dispatch(setFilterBy(filterBy))
    dispatch(loadContacts())
  }, [dispatch])


  if (!contacts) return <div className="loader">Loading...</div>
  return (
    <div className="contacts-page">
      <ContactFilter onFilter={onFilter} />
      <Link className="btn-add-contact" to="/contact/edit">+</Link>
      <ContactList contacts={contacts} />
    </div>
  )
}