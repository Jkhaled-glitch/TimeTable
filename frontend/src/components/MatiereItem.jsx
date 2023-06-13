import { useDispatch } from 'react-redux'
import { useDrag } from 'react-dnd'
import { deleteMatiere } from '../features/matieres/matiereSlice'
import Delete from '../delete.png'

function MatiereItem({ matiere }) {
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
      <h6>  {matiere.code}</h6>
    
      <button onClick={() => 
      dispatch(deleteMatiere(matiere._id))} className='close'>
        <img src={Delete} style={{width:"20px",height:"20px" }}/>
      </button>
    </div>
  )
}

export default MatiereItem
