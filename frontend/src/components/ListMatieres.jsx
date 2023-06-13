import {  useDispatch } from 'react-redux'
import Heure_Pause from '../components/Heure_Pause'
import MatiereItem from '../components/MatiereItem'
import { createMatiere,deleteMatiere } from '../features/matieres/matiereSlice'
import { useDrop } from 'react-dnd'
import { useNavigate } from 'react-router-dom'

function ListMatieres({matieres}) {
  const dispatch = useDispatch()
  const navigate=useNavigate()
  const days=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday" ]
  
  const [{isOver},drop]=useDrop(()=>({
    accept:"text/plain",
    drop:(item)=> {RemoveMatieresToDays(item)},
    collect:(monitor)=>({
      isOver:!!monitor.isOver()
    })
  }))
  
  const RemoveMatieresToDays=(matiere)=>{
    const title = matiere.title
    const description = matiere.description
    const duration = matiere.duration
    const color = matiere.color
    const code = matiere.code 
    const Pause= (matiere.title=="Pause"&& matiere.description=="Pause" && matiere.duration=="1"  && matiere.code=="pause")
    dispatch(deleteMatiere(matiere._id))
    if(Pause!= true)
    dispatch(createMatiere({ title:title,description:description,duration:duration,color:color,code:code,day:"null",time:"null"}))
  }
 
return(
<div className='matieres' 
          ref={drop}>
            

    <button onClick={ ()=>navigate('/add')} className="btn-add">
      +
    </button>

    {matieres.length > 0 ? (
      

            matieres.map((matiere) => {
              if(!days.includes(matiere.day))
                return(
              <MatiereItem key={matiere._id} matiere={matiere} />
                )
            }

            )
      ): (
      <h3>You have not set any matieres</h3>
    )}
     {matieres.length > 0 ? (
      

    <Heure_Pause style={{display:matieres.length > 0 ? "flex":"none"}}  matiere={{ title:"Pause",description:"Pause",duration:"1",color:"#2c2c6c",code:"pause",day:"null",time:"null"}} />
    ): (
      null
      )}
          </div>
          )
        }
        export default ListMatieres