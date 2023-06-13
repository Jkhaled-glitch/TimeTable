import DayItem from './DayItem'

function Timing() {
const days=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday" ]
const hours=["8H--9H","9H--10H","10H--11H","11H--12H","14H--15H","15H--16H","16H--17H","17H--18H"]


    return (
    
     <div className="week">
          <div className='day' >
          <div className="title">Hours</div>
          { 
            hours.map((hour)=>{
            return(
          
          <div  key={hour[1]}
          className='hour'
        
        >
          
          <span>{hour}</span>
        
        </div>
           )
        })
           
        }
        
      </div>


       {
         days.map((day)=>{
            return (
            <DayItem day={day} />
            )
         })
       }
     </div>
     
    )
  }
  
  export default Timing
  