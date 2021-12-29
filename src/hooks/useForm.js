import { useEffect, useState } from "react"

export const useForm = (initialState, cb = () => { }) => {
  const [fields, setFields] = useState(initialState)

  useEffect(() => {
    cb(fields)
  }, [fields])

  const handleChange = ({ target }) => {
    const field = target.name
    const value = target.type === 'number' ? +target.value : target.value
    setFields(prevFields => ({ ...prevFields, [field]: value }))
  }

  const register = (field, type = 'text') => {
    return {
      name: field,
      id: field,
      type,
      value: fields[field],
      onChange: handleChange
    }
  }

  return [fields, handleChange, setFields, register]
}