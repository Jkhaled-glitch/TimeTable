import { useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate} from 'react-router-dom'
import { createMatiere } from '../features/matieres/matiereSlice'

function MatiereForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [duration, setDuration] = useState(1)
  const [color, setColor] = useState("#653883")
  const [code,setCode]=useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  

  useEffect(() => {

    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  const onSubmit = (e) => {
    e.preventDefault()
      
    dispatch(createMatiere({ title:title,description:description,duration:duration,color:color,code:code,day:"null",time:"null"}))
    setTitle('')
    setDescription('')
    setDuration(1)
    setColor("#6e3172")
    setCode('')
    navigate('/')
  }
  const handleDuration =(e)=>{
    let val = parseInt(e.target.value)
    if(val>0)
    setDuration(e.target.value)
    else
    setDuration(1)
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        
        <div className='form-group'>
          <label htmlFor='title'>Matiere</label>
          <input
            type='text'
           id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        
        <div className='form-group'>
          <label htmlFor='description'>Description</label>
          <textarea
            type='text'
           
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        
        <div className='form-group'>
          <label htmlFor='duration'>Duration</label>
          <input
            type='number'
           id="duration"
            value={duration}
            onChange={(e) => handleDuration(e) }
            required
          />
          
        </div>

        <div className='form-group'>
          <label htmlFor='code'>Code</label>
          <input
            type='text'
           id="code"
            value={code}
            onChange={(e) => setCode(e.target.value) }
            required
          />
          
        </div>

        
        <div className='form-group'>
        
          <label for="color">
          Color:<p style={{backgroundColor:color}} >{color}</p>
          </label>
          <input 
            className='indisplayed'
            type='color'
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
         
          />
  </div>
        
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add Matiere
          </button>
        </div>
      </form>
    </section>
  )
}

export default MatiereForm
