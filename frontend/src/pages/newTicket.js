import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import {
  createTicket,
  reset,
} from "../features/tickets/ticketSlice"
import Spinner from "../components/Spinner"
import BackButton from "../components/BackButton"

function NewTicket() {
  const { user } = useSelector(state => state.auth)
  const { isLoading, isError, isSuccess, message } = useSelector(
    state => state.tickets,
  )

  const [name] = useState(user.name)
  const [email] = useState(user.email)
  const [product, setProduct] = useState("")
  const [description, setDescription] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      toast.error(message, { autoClose: 900 })
    }

    if (isSuccess) {
      toast.success("Ticket created 🎊", { autoClose: 900 })
      dispatch(reset())
      navigate("/tickets ")
    }

    dispatch(reset())
  }, [dispatch, navigate, isError, isSuccess, message])

  const handleSubmit = e => {
    e.preventDefault()

    dispatch(createTicket({ product, description }))
  }

  if (isLoading) return <Spinner />

  return (
    <>
      <BackButton url='/' />
      <section className='heading'>
        <h1>Create new ticket</h1>
        <p>Please fill out the form below</p>
      </section>
      <section className='form'>
        <div className='form-group'>
          <label htmlFor='name'>Customer Name</label>
          <input
            className='form-control'
            type='text'
            value={name}
            disabled
          />
        </div>
        <div className='form-group'>
          <label htmlFor='name'>Customer Email</label>
          <input
            className='form-control'
            type='email'
            value={email}
            disabled
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='product'>Product</label>
            <select
              name='product'
              id='product'
              value={product}
              onChange={e => setProduct(e.target.value)}
            >
              <option value=''>please select a product</option>
              <option value='iPhone'>iPhone</option>
              <option value='iPad'>iPad</option>
              <option value='MacBook Pro'>MackBook Pro</option>
              <option value='MacBook Air'>MackBook Air</option>
              <option value='AirPods'>Air Pods</option>
              <option value='Apple Watch'>Apple Watch</option>
              <option value='AirTag'>AirTag</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='description'>
              Description of issue
            </label>
            <textarea
              name='description'
              id='description'
              className='form-control'
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder='Description'
            ></textarea>
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default NewTicket
