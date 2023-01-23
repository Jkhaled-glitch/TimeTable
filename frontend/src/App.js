import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import MatiereForm from './components/MatiereForm'
import UpdateMatiere from './components/UpdateMatiere'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'



function App() {
  return (
    <>
    
      <Router>
        <div className='container'>
          
          <Header />
          <Routes>
            <Route path='/' element={<Dashboard />} />

            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/add' element={<MatiereForm />} />
            
            <Route path='/update/:id' element={<UpdateMatiere />} />
            
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
