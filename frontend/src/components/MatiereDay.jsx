import { useDrag } from 'react-dnd'
import { useNavigate } from 'react-router-dom'
import Edit from '../edit.png'






function MatiereItem({ matiere }) {
  const navigate =useNavigate()
  const [{isDragging},drag]=useDrag(()=>({
    type:"text/plain",
    item:matiere,
    collect: (monitor)=>({
      isDragging:!!monitor.isDragging(),
      
     
          }),
  }))

  const Pause= (matiere.title=="Pause"&& matiere.description=="Pause" && matiere.duration=="1"  && matiere.code=="pause")

  return (
    <div  
      ref={drag}
      className='matiere-day'
      style={{backgroundColor:Pause ? "#0b0b10": matiere.color,
              display: isDragging ? "none":"flex",
              gridRow:"span "+matiere.duration
            
    }}
    >
      <div className='duration'>{Pause==true ? '':matiere.duration+"H"} </div>
      <div >{Pause ? '':matiere.title}</div>
    {
      Pause ? null:
    
      <button onClick={() => navigate('/update/'+matiere._id)
        } className='edit'>
        <img src={Edit} style={{width:"20px",height:"20px" }}/>
      </button>
}
    </div>
  )
}

export default MatiereItem
