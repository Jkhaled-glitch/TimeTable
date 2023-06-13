import { useDispatch } from 'react-redux'
import { useDrag } from 'react-dnd'
import { deleteMatiere } from '../features/matieres/matiereSlice'
import Delete from '../delete.png'

function Heure_Pause({ matiere }) {
  const dispatch = useDispatch()
  
  const [{isDragging},drag]=useDrag(()=>({
    type:"text/plain",
    item:matiere,
    collect: (monitor)=>({
      isDragging:!!monitor.isDragging(),
    }),
  }))
  return (
    <div  
      ref={drag}
      style={{backgroundColor: matiere.color,
              display: isDragging? "none":"flex"}} 
      className='matiere'  
    
    >
      
      <h5>{matiere.title}</h5>
    
     
    </div>
  )
}

export default Heure_Pause
