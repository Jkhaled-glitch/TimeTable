import { useEffect,createContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getMatieres, reset } from '../features/matieres/matiereSlice'
import Timing from '../components/Timing'
import ListMatieres from '../components/ListMatieres'

import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'


export const UserEmploiContext =createContext()

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
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

 
  
  return (
    <>
    <DndProvider backend={HTML5Backend}>
    
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
      </section>
      
      <section className='content'>

        <div>
        
          <ListMatieres matieres={matieres} />
          
        
        </div>
        <div >
            <UserEmploiContext.Provider value={matieres}>
                <Timing />
            </UserEmploiContext.Provider>
        </div>
      </section>
      </DndProvider>
    </>

  ) 
}

export default Dashboard
