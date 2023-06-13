import { useState ,useEffect} from 'react'
import { useDispatch ,useSelector} from 'react-redux'
import { useParams,useNavigate} from 'react-router-dom'
import { getMatieres,deleteMatiere,createMatiere, reset } from '../features/matieres/matiereSlice'



function UpdateMatiere() {

    const params = useParams();
  
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) =>
     state.auth
     )
   const { matieres, isLoading, isError, message } = useSelector(
    (state) => state.matieres
      )
  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getMatieres())
    return () => {
      dispatch(reset())
    }
   
  }, [user, navigate, isError, message, dispatch])

  const onSubmit = (e,matiere) => {
    e.preventDefault()

    let newTitle = (title == null ? matiere.title : title)
    let newDescription = (description == null ? matiere.description : description)
    let newDuration = (duration == null ? matiere.duration : duration)
    let newColor = (color == null ? matiere.color : color)
    let newCode = (code == null ? matiere.code : code)
    let day = matiere.day
    let time = matiere.time



    //Update ne fonctionne pas
    //dispatch(updateMatiere(matiere._id,matiereData))
    
    dispatch(deleteMatiere(matiere._id))
    dispatch(createMatiere({ title:newTitle,description:newDescription,duration:newDuration,color:newColor,code:newCode,day:day,time:time}))
    //
    navigate("/")
  }
  const handleDuration =(e)=>{
    let val = parseInt(e.target.value)
    if(val<1)
    setDuration(1)
    else{
      if(val>4)
      setDuration(4)
      else
      setDuration(e.target.value)
      
    }
   
    
  }

  if(matieres.length>0){
    // setmyMatiere(matieres)
     console.log(matieres)
    
     
   }

    const [title, setTitle] = useState(null)
    const [description, setDescription] = useState(null)
    const [duration, setDuration] = useState(null)
    const [color, setColor] = useState(null)
    const [code,setCode]=useState(null)
 

  if(isLoading){
    return <div> Loading...</div>
  }
 
  return (  
  
    matieres.map(matiere=>{
      
      if(matiere._id == params.id){
      
      
      return(
    <section className='form'> 
      
      <form onSubmit={(e)=>onSubmit(e,matiere)} >
        
        <div className='form-group'>
          <label htmlFor='title'>Matiere</label>
          <input
            type='text'
           id="title"
            value={  title == null ? matiere.title : title   }
            onChange={(e) => setTitle(e.target.value) }
          />
        </div>

        
        <div className='form-group'>
          <label htmlFor='description'>Description</label>
          <textarea
            type='text'
           
            id='description'
            value={ description == null ? matiere.description : description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        
        <div className='form-group'>
          <label htmlFor='duration'>Duration (Between 1 and 4)</label>
          <input
            type='number'
           id="duration"
            value={ duration == null ? matiere.duration : duration}
            onChange={(e) => handleDuration(e) }
            required
          />
          
        </div>

        <div className='form-group'>
          <label htmlFor='code'>Code</label>
          <input
            type='text'
           id="code"
            value={  code == null ? matiere.code : code}
            onChange={(e) => setCode(e.target.value) }
            required
          />
          
        </div>

        
        <div className='form-group'>
        
          <label for="color">
          Color:<p style={{backgroundColor: (color == null ? matiere.color : color) }} >{color == null ? matiere.color : color}</p>
          </label>
          <input 
            className='indisplayed'
            type='color'
            id="color"
            value={color == null ? matiere.color : color}
            onChange={(e) => setColor(e.target.value)}
            
          
          />
  </div>
        
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Update Matiere
          </button>
        </div>
      </form>
    </section>
      )
      }
       })

    
  )
 
}

export default UpdateMatiere
