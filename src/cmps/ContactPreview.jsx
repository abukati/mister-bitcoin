import { BigHead } from "@bigheads/core"

export function ContactPreview({ contact }) {
  return (
    <>
      <div className="contact-img">
        <BigHead />
      </div>
      <div className="contact-details">
        <div className="contact-name">
          {contact.name}
        </div>
        <div className="contact-phone">
          {contact.phone}
        </div>
        <div className="contact-email">
          {contact.email}
        </div>
      </div>
    </>
  )
}
