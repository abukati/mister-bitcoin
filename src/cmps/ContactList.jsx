import { Link } from "react-router-dom"
import { ContactPreview } from "./ContactPreview"

export function ContactList({ contacts }) {
  return (
    <div className="contacts-list-container">
      <ul className="contacts-list">
        { contacts.map(contact => 
          <li className="contact" key={contact._id}>
            <Link to={`/contact/${contact._id}`}>
              <ContactPreview contact={contact} />
            </Link>
          </li>) 
        }
      </ul>
    </div>
  )
}
