import { useState } from 'react'
import { useSelector } from 'react-redux'

function NewTicket() {
  const { user } = useSelector(state => state.auth)
  const [name] = useState(user.name)
  const [email] = useState(user.email)
  const [product, setProduct] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
  }

  return (
    <>
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
            <button className="btn btn-block"></button>
          </div>
        </form>
      </section>
    </>
  )
}

export default NewTicket
