import React , {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../Images/Logo.png'
import search  from '../Images/Search.png'
import { Link } from 'react-router-dom'
import axios from 'axios'
import UnConfirmedReservation from '../Components/UnConfirmedReservation'
import ReservationInfrrmation from '../Models/ReservationInfrrmation'
import AddNewClient from '../Models/AddNewClient'
import NavBar from '../Components/NavBar'



const Customers = () => {
  const [clientREservations,setClientREservations]=useState([])
  const [showModel , setshowModel] = useState(false);
  const [showAddnewClient , setshowAddnewClient] = useState(false);
  const [clicked , setClicked] = useState(null)

  const [SelecteReservation , setSelecteReservation] = useState(1);
  const [open , setOpen] = useState(false)
  function opened(){
    setOpen(!open)
 }
  const handleonReservationSelect = (reservationId) => {
    setSelecteReservation(reservationId);
    setshowModel(true);
    console.log(showModel)
  };
   const handleRowClick = (index) => {
    setSelectedRow(index);
    onArtistClick(artistsData[index]);
  };
async function getReservations(){
  axios
  .get('https://api.march.gomaplus.tech/api/client_reservations?per_page=10000', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
  .then((res) => {
    // Filter and organize the response data
    const filteredData = res.data.data.reduce((acc, reservation) => {
      const clientIndex = acc.findIndex((obj) => obj.client.id === reservation.client.id);
      if (clientIndex === -1) {
        acc.push({
          client: {
            id: reservation.client.id,
            name: reservation.client.name,
          },
          reservations: [
            {
              date: reservation.date,
              status: reservation.status,
              expert: reservation.expert.name,
              id:reservation.id
            },
          ],
        });
      } else {
        acc[clientIndex].reservations.push({
          date: reservation.date,
          status: reservation.status,
          expert: reservation.expert.name,
          id:reservation.id
        });
      }
      return acc;
    }, []);
    setClientREservations(filteredData);
  })
  .catch((err) => console.log(err));
}


  useEffect(() => {
    getReservations()
  }, []);


    let nav=useNavigate()
     const [toggleState, setToggleState]=useState(1)
    const toggleTap = (index) => {
        setToggleState(index);
    }
  return (
    <div>

    {showAddnewClient && (
      <div className='absolute right-1'>
        <AddNewClient onModelClose={() => setshowAddnewClient(false)} />
      </div>
    )}
    {showModel && (
      <div className='absolute right-1'>
        <ReservationInfrrmation data={SelecteReservation} onModelClose={() => setshowModel(false)} />
      </div>
    )}
   {/**  <button onClick={() => setshowModel(!showModel)}>Toggle Model</button>  */}

   <div className=' bg-white items-center flex justify-center'>
   <div className='w-[88%] h-[90%]'>
       <div>
            <div className='flex justify-end' onClick={opened}>
<div
    >
        <div className={toggleState === 1 ? " text-white bg-gradient-to-b from-[#F5C8909E] to-[#E3AB67]  mt-3 p-1 flex justify-center xxs:w-28 xs:w-40  rounded-l-sm": " text-white bg-[#D9D9D9] mt-3 p-1 flex justify-center  xxs:w-28  xs:w-40  rounded-l-sm"}
       onClick={() => {toggleTap(1) ; setOpen(!open)}}
       >
         <h1 className='text-sm p-1'>الحجوزات المثبتة</h1>
       </div>
       </div>
       <div
    >
        <div className={toggleState === 2 ? " text-white bg-gradient-to-b from-[#F5C8909E] to-[#E3AB67]   mt-3 p-1 flex justify-center  xxs:w-28  xs:w-40  rounded-r-sm": "text-white bg-[#D9D9D9] mt-3 p-1 flex justify-center  xxs:w-28  xs:w-40  rounded-r-sm "}
       onClick={() => {toggleTap(2) ; setOpen(!open)}}
       >
         <h1 className='text-sm p-1'>غير المثبتة</h1>
       </div>
       </div>
</div>
       </div>
       <div className='flex justify-between mt-10 '>
           <div className='flex '>
               <div className=' relative'>
               <img src={search} alt="Search Icon" class="absolute right-[10%] mt-4 h-4 w-4"/>
       <input type="text" placeholder="بحث" class="w-64 h-12 border mr-5 bg-[#E7E7E787] placeholder:mr-5 placeholder:text-[#FFFFFF] placeholder:text-right placeholder:text-sm py-2 px-4 relative "/>
       </div>
       <button onClick={()=>{setshowAddnewClient(true)}} className='w-44 h-12 border-2 border-[rgb(227,171,103)] text-[#D4821F] text-sm'>اضافة زبون جديد</button>
       </div>
           <h2 className='text-3xl text-right text-[#D4821F]'>الزبائن وتاريخ الحجوزات</h2>
       </div>
       <div className='mt-8'>
       <UnConfirmedReservation Data={clientREservations} onReservationSelect={handleonReservationSelect}/>
       </div>
      
   </div>
</div>
</div>
)
}

export default Customers