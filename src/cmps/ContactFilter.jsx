import { useSelector } from 'react-redux'
import { useForm } from '../hooks/useForm'

export const ContactFilter = (props) => {

  const { filterBy } = useSelector(state => state.contactModule)
  console.log(filterBy);
  const [filter, handleChange, setFields, register] = useForm({ ...filterBy }, props.onFilter)

  return (
    <form className="contact-filter">
      <label htmlFor="filterByAll">Set filter:</label>
      <input {...register('filterByAll')} />
    </form>
  )
}
