import react,{ useState,useEffect }from 'react';
import './details.css';
import { PieChart } from 'react-minimal-pie-chart';
// import Alert from '@mui/material/Alert';
// import Snackbar from '@mui/material/Snackbar';
// import { useQuery } from 'react-router-dom';

// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
import { useParams } from 'react-router-dom'
const Details=()=>{
    const[isError,setIsError]=useState(false);
    const[error,SetError]=useState("");
    let {deviceId,deviceType}=useParams();
    const [data,setData]=useState([])
    const [pieData,SetPieData]=useState([])
   
    console.log(deviceId,deviceType);
    
     useEffect(() => {
        const submitHandler = async () => {
            try {
              const response = await fetch(`https://pensieve0203.herokuapp.com/gps/details?deviceId=${deviceId}&deviceType=${deviceType}`, {
                method:"GET",
                headers: {
                  "Content-Type": "application/json",
                },
                
              });
              const dbData = await response.json();
            //   if(!dbData.ok){
            //     throw new Error(data.message);
            //   }
              console.log("real data",dbData.data[0].table);
              setData(dbData.data[0].table);
              const temp=dbData.data[0].pieChart;
              console.log("dekho",temp.length)
              let mapArray=[];
              if(temp.length>0){
                for(let i=0;i<temp.length;i++){
                    let map={}
                    map.title=temp[i].location;
                    map.value=temp[i].percentage;
                    var randomColor = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
                    map.color=randomColor;
                    console.log(map)
                    mapArray.push(map);
                }
                console.log(mapArray);
              }
              SetPieData(mapArray);
            } catch (error) {
              console.log(error);
              setIsError(true);
              SetError(error.message);
    
    
            }
          };
         submitHandler();
    //      let={}
    //    if(data.length>0){

    //    }
         
      },[]);
//   const result=  {
//         "data": {
//             "table": [
//                 {
//                     "DeviceId": "D-1569",
//                     "DeviceType": "Asset",
//                     "Timestamp": "31-08-2022 10:15",
//                     "Location": "L4"
//                 },
//                 {
//                     "DeviceId": "D-1569",
//                     "DeviceType": "Asset",
//                     "Timestamp": "31-08-2022 10:20",
//                     "Location": "L4"
//                 },
//                 {
//                     "DeviceId": "D-1569",
//                     "DeviceType": "Asset",
//                     "Timestamp": "31-08-2022 10:25",
//                     "Location": "L1"
//                 },
//                 {
//                     "DeviceId": "D-1569",
//                     "DeviceType": "Asset",
//                     "Timestamp": "31-08-2022 10:30",
//                     "Location": "L1"
//                 },
//                 {
//                     "DeviceId": "D-1569",
//                     "DeviceType": "Asset",
//                     "Timestamp": "31-08-2022 10:35",
//                     "Location": "L2"
//                 }
//             ],
//             "pieChart": [
//                 {
//                     "totaltime": 10,
//                     "totalcount": 2,
//                     "percentage": "40%"
//                 },
//                 {
//                     "totaltime": 5,
//                     "totalcount": 1,
//                     "percentage": "20%"
//                 },
//                 {
//                     "totaltime":  10,
//                     "totalcount": 2,
//                     "percentage": "40%"
//                 }
//             ]
//         },
//         "success": true,
//         "message": "Data fetch successfuly"
//     }
    const handleErrorClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setIsError(false);
      };
    //   const Action = (
    //     <react.Fragment>
    //       <Button color="secondary" size="small" onClick={handleErrorClose}>
    //         UNDO
    //       </Button>
    //       <IconButton
    //         size="small"
    //         aria-label="close"
    //         color="inherit"
    //         onClick={handleErrorClose}
    //       >
    //         <CloseIcon fontSize="small" />
    //       </IconButton>
    //     </react.Fragment>
    //   );

return(
<div className="container-fluid detailMain d-flex flex-column">
    <div className=' header d-flex flex-column'>
        
        <h2>{deviceId}</h2>
        <h3>{deviceType}</h3>
    </div>
    <div className='d-flex flex-row justify-content-around '>
    <table className=" table  box ">
        <thead>
                <tr>
                    <th>Timestamp</th>
                    <th>Location</th>
                </tr>
        </thead>
        <tbody>
        {
            data.map((d)=>(
                <tr key={d.id}>
                <td>{d.timestamp}</td>
                <td>{d.location}</td>
                </tr>
            ))
        }
        </tbody>
    </table >
    <div className=" d-flex flex-row box  ">
    <div className='chart'>
    <PieChart
  data={pieData}
  />
    </div>
    <div className='straight'>
            <p className='para'>Time spend on each location</p>
            {
                pieData.map((d)=>(
                    <ul>
                        <li><span className='para'>{d.title}</span>
                        <ul className="nestedPara">
                            <li className="para">
                                {d.value}
                            </li>
                            </ul></li>
                    </ul>
                ))
            }
    </div>
    </div>
    </div>
</div>
);
}

export default Details;