import { useState, useEffect,useRef } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Refresh from '../ref.png'



const  Login=()=> {
 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [random,setRandom] =useState( Math.floor(Math.random() * (10000 - 1000) + 1000))
  const [captcha,setCaptcha] = useState('')
  const[errorCaptcha,setErrorCaptcha]=useState(false)




  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  
 

  const onSubmit =(e) => {
    e.preventDefault()
    if(random==captcha){
        const userData = {
        email:email,
        password:password,
        }

        dispatch(login(userData))
       
      }
      else{
        setErrorCaptcha(true)
         setRandom( Math.floor(Math.random() * (10000 - 1000) + 1000))
      }  
  }

   

  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login and start organizing your time</p>
      </section>

      <section className='form'>

        <form onSubmit={onSubmit}>

          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
            
          </div>

          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={(e)=>setPassword(e.target.value)}
              required
            />
           
          </div>
          
         

        

          <div className='form-group' >
              <button 
                  className='btn-refresh'
                  type='button'
                  onClick={()=>setRandom( Math.floor(Math.random() * (10000 - 1000) + 1000))}
                  >
                  <img src={Refresh} style={{width:"25px",height:"25px"}}/>
              </button>
              <div className='code-captcha'>
                    {random}
              </div>
          </div>

            <div className='form-group' >
          <input
              type='number'
              className='form-control'
              id='captcha'
              name='captcha'
              value={captcha}
              placeholder='Enter Captcha'
              onChange={(e)=>setCaptcha(e.target.value)}
              style={{  border:errorCaptcha?"1px solid red":null}}
              maxLength="4"
              required
            />
              
          </div>

          <div className='form-group'>

            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login
