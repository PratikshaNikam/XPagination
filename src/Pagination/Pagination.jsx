import { useEffect, useState } from "react";  


export default function Pagination() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowPerPage = 10;
 
  const lastIndex = currentPage * rowPerPage;
  const firstIndex = lastIndex - rowPerPage;

  const currentData = data.slice(firstIndex, lastIndex);
  const pageNumber = Math.ceil(data.length / rowPerPage);
  const pages = [...Array(pageNumber + 1).keys()].slice(1);

 


  useEffect(() => {
    fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch(
        (err) =>
          console.log(err) ,
        alert("failed to fetch data")
    );
  }, []); 

  console.log(data);

  const prePage=()=>{
    if(currentPage !== 1){
      setCurrentPage(currentPage - 1)
    }
  }

  const nextPage=()=>{
    if(currentPage !== pageNumber){
      setCurrentPage(currentPage + 1)
    }
  }

  const changePage=(id)=>{
    setCurrentPage(id)
  }


  return (
    <div>
      <h1>Employee Data Table</h1>

      <table>
        <thead>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>


        </thead>

        <tbody>
          {currentData.map((d, i) => (
            <tr key={i}>
              <td>{d.id}</td>
              <td>{d.name}</td>
              <td>{d.email}</td>
              <td>{d.role}</td>
            </tr>
            
          ))}
        </tbody>

       
        
      </table>
      
        {/* <ul className="pagination">
          <li className='page-item'>
            <a href='#' className='page-link' onClick={prePage}>Prev</a>
          </li>

          {pages.map((page, index) => (
            <li className={`page-item ${currentPage === page ? 'active' : ''}`} key={index}>
              <a href='#' className='page-link' onClick={() => changePage(page)}>
                {page}
              </a>
            </li>
          ))}

          <li className='page-item'>
            <a href='#' className='page-link' onClick={nextPage}>Next</a>
          </li>
          </ul> */}
        


        
      <div>
          <button className='page-link' onClick={prePage}>Previous</button>
          <p>{currentPage}</p>
          <button  className='page-link' onClick={nextPage}>Next</button>

      </div>
         
          
          
          
      
    </div>
  );
}