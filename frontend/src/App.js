import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute.js'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import NewTicket from './pages/newTicket'

function App() {
  return (
    <>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/new-ticket" element={<PrivateRoute />}>
              <Route path="/new-ticket" element={<NewTicket />} />
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
