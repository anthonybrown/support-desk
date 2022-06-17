import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  useParams,
  useNaviagate,
  useNavigate,
} from 'react-router-dom'
import {
  getTicket,
  getTickets,
  closeTicket,
  deleteTicket,
  reset,
} from '../features/tickets/ticketSlice'
import { toast } from 'react-toastify'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

function Ticket() {
  const { ticket, isLoading, isSuccess, isError, message } =
    useSelector(state => state.tickets)

  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { ticketId } = useParams()

  useEffect(() => {
    if (isError) {
      toast.error(message, { autoClose: 1500 })
    }

    dispatch(getTicket(ticketId))
  }, [isError, message, ticketId])

  if (isLoading) return <Spinner />

  if (isError) {
    return <h3>💩 Something went wrong</h3>
  }

  const handleTicketClose = () => {
    dispatch(closeTicket(ticketId))
    toast.success('Ticket Closed', { autoClose: 900 })
    navigate('/tickets')
  }

  const handleTicketDelete = () => {
    dispatch(deleteTicket(ticketId))
    toast.success('Ticket Deleted', { autoClose: 901 })
    navigate('/tickets')
  }

  if (isLoading) return <Spinner />

  return (
    <>
      <div className="ticket-page">
        <header className="ticket-header">
          <BackButton url="/tickets" />
          <h2>
            Ticket ID: {ticket._id}
            <span className={`status status-${ticket.status}`}>
              {ticket.status}
            </span>
          </h2>
          <h3>
            Date Submitted:{' '}
            {new Date(ticket.createdAt).toLocaleString('en-US')}
          </h3>
          <hr />
          <div className="ticket-desc">
            <h3>Description of issue</h3>
            <p>{ticket.description}</p>
          </div>
        </header>

        {ticket.status !== 'closed' && (
          <button
            className="btn btn-block btn-danger"
            onClick={handleTicketClose}
          >
            Close Ticket
          </button>
        )}
        {ticket.status !== 'new' && (
          <button
            className="btn btn-block btn-danger"
            onClick={handleTicketDelete}
          >
            Delete Ticket
          </button>
        )}
      </div>
    </>
  )
}

export default Ticket
