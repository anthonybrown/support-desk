import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createTicket, reset } from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import { BackButton } from '../components/BackButton'

function NewTicket() {
  const { user } = useSelector(state => state.auth)
  const { isLoading, isError, isSuccess, message } = useSelector(
    state => state.ticket,
  )

  const [name] = useState(user.name)
  const [email] = useState(user.email)
  const [product, setProduct] = useState('')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      dispatch(reset())
      navigate('/tickets ')
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
      <BackButton url="/" />
      <section className="heading">
        <h1>Create new ticket</h1>
        <p>Please fill out the form below</p>
      </section>
      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input
            className="form-control"
            type="text"
            value={name}
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Customer Email</label>
          <input
            className="form-control"
            type="email"
            value={email}
            disabled
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <select
              name="product"
              id="product"
              value={product}
              onChange={e => setProduct(e.target.value)}
            >
              <option value="iPhone">iPhone</option>
              <option value="iPad">iPad</option>
              <option value="Macbook Pro">Mackbook Pro</option>
              <option value="airpods">Air Pods</option>
              <option value="iMac">iMac</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description of issue</label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Description"
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default NewTicket
