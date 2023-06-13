import { useDrop } from "react-dnd"
import MatiereDay from "./MatiereDay"
import { useContext,useState } from "react"
import { useDispatch } from 'react-redux'
import {UserEmploiContext} from "../pages/Dashboard"
import {createMatiere,deleteMatiere} from "../features/matieres/matiereSlice"
import { set } from "mongoose"

function DayItem({ day }) {
  const dispatch=useDispatch()
  const [{isOver},drop]=useDrop(()=>({
    accept:"text/plain",
    drop:(item)=> {addMatieresToDay(item)},
    collect:(monitor)=>({
      isOver:!!monitor.isOver()
    })
  }))

  
  
  const  matieres = useContext(UserEmploiContext)
 
  const addMatieresToDay=(matiere)=>{
    const title = matiere.title
    const description = matiere.description
    const duration = matiere.duration
    const color = matiere.color
    const code = matiere.code 
    const newDay=day
   
    
    dispatch(deleteMatiere(matiere._id))
    dispatch(createMatiere({ title:title,description:description,duration:duration,color:color,code:code,day:newDay,time:"null"}))
    
  }

    return (
      
      <div className='day' 
      ref={drop}>
        <div className="title">  {day}</div>
        { 
          matieres.map((matiere)=>{
            if(matiere.day==day)        
            return(
             <MatiereDay key={matiere._id} matiere={matiere} />
            )
            
          })
        }
        
      </div>
    )
  }
  
  export default DayItem
  