import { useState, useEffect } from "react";
import "./sumary.css";
import {
  faArrowDown,
  faArrowUp,
  faSearch,
  faGreaterThan,
  faLessThan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Summary = () => {
  let [data, setData] = useState([]);
  let [mainData, setMainData] = useState([]);
  const [order, setOrder] = useState("ASC");
  let [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  let [search, setSearch] = useState("");
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  let start = (page - 1) * limit;
  // const [searchTerm,SetSearchTerm]=useState("");

  console.log(page, search);
  const handlePagination = async () => {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    console.log(startIndex, endIndex);

    data = await mainData.slice(startIndex, endIndex);
    // setData(data);
    return data;
  
  };
  // const handlePage=async(data)=>{
  //   const startIndex=(page-1)*limit;
  //   const endIndex=page*limit;
  //   console.log(startIndex,endIndex);
  //  let  result=await data.slice(startIndex,endIndex);
  //   // setData(data);
  //   return result;
  //   // console.log("over");
  // }
  const handleNextPage = async () => {
    page = page + 1;
    setPage(page);
    setData(await handlePagination());
  };
  const handlePreviousPage = async () => {
    if (page > 1) {
      page -= 1;
      setPage(page);
      setData(await handlePagination());
    }
  };
  useEffect(() => {
    const submitHandler = async () => {
      try {
        const response = await fetch(`https://pensieve0203.herokuapp.com/gps/summary`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const dbData = await response.json();
        if (dbData.success) {
          console.log("success");
          console.log(dbData.data);
          setMainData(dbData.data);
          setData(dbData.data);
        } else {
          setIsError(true);
          setError(dbData.message || "something went wrong");
        }
      } catch (error) {
        console.log(error);
        setIsError(true);
        setError(error.message || "something went wrong");
      }
    };
    submitHandler();
    //  let str=`{data:"hello"}`
    //   console.log(JSON.parse(str))
  }, []);
  //   const handleChangeRowsPerPage = (event) => {
  //     setRowsPerPage(parseInt(event.target.value, 10));
  //     setPage(0);
  //   };
  //  let init='&uarr;';
  //  const[buttonText,setButtonText]=useState(init);
  //  const changeText=()=>{
  //     if(buttonText===init)
  //     setButtonText("&darr;");
  //     else if(buttonText==="&darr;"){
  //         setButtonText(init);
  //     }
  //  }
  //console.log(data);
  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = data.sort((a, b) => (a[col] > b[col] ? 1 : -1));
      setData(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...data].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setOrder("ASC");
    }
  };
  return (
    <div>
      {isError && error.length > 1 ? (
        <div className=" alert alert-danger" role="alert">
          {error}
        </div>
      ) : (
        <></>
      )}
      <div className="summaryMain">
        <div className="subSummaryMain">
          <table className="table"><tbody>
            <tr>
              <td colSpan="2">
                <div className="searchWrapper">
                  <div className="searchIcon">
                  <FontAwesomeIcon className="searchIcon" icon={faSearch} />
                  </div>
                  <input
                    className="search"
                    type="text"
                    value={search}
                    placeholder="search only"
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                </div>
              </td>
              <td colSpan="3" className="d-flex flex-row">
                <div className="pagination">
                  {start}-{page * limit}of{mainData.length}
                </div>
                <div>
                  <FontAwesomeIcon
                    className="less than"
                    onClick={handlePreviousPage}
                    icon={faLessThan}
                  />
                  <FontAwesomeIcon
                    className="greater than"
                    onClick={handleNextPage}
                    icon={faGreaterThan}
                  />
                </div>
              </td>
            </tr>
            </tbody>
          </table>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">
                  DeviceId
                  <FontAwesomeIcon
                    onClick={() => {
                      sorting("DeviceId");
                    }}
                    icon={order === "ASC" ? faArrowUp : faArrowDown}
                  />
                </th>
                <th className="hello" scope="col">
                  DeviceType
                  <FontAwesomeIcon
                    onClick={() => {
                      sorting("DeviceType");
                    }}
                    className="hello"
                    icon={order === "ASC" ? faArrowUp : faArrowDown}
                  />
                </th>
                <th scope="col">Latest Timestamp</th>
                <th scope="col">Latest Location</th>
                <th scope="col"> </th>
              </tr>
            </thead>
            <tbody>
              {data
                .filter((val) => {
                  let data;
                  if (search === "") {
                    data = val;
                  } else if (
                    val.deviceid.toLowerCase().includes(search.toLowerCase()) ||
                    val.devicetype.toLowerCase().includes(search.toLowerCase())
                  ) {
                    data = val;
                  }
                  return data;
                })
                .map((d) => (
                  
                  <tr key={d.id}>
                    <td>{d.deviceid}</td>
                    <td>{d.devicetype}</td>
                    <td>{d.timestamp}</td>
                    <td>{d.location}</td>
                    <td colSpan="5">
                      {/* <span className='revelar'><span className='hidden'>see details</span>-&gt;</span> */}
                      <button
                        type="button"
                        //class=""
                        data-toggle="tooltip"
                        data-placement="left"
                        title="see details"
                      >
                        <Link
                          className="summaryLink"
                          to={`/gps/details/${d.deviceid}/${d.devicetype}`}
                        >
                          -&gt;
                        </Link>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Summary;
