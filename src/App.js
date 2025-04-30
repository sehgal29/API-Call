import React, { useState, useEffect } from 'react'
import './App.css';
import { FaEnvelope, FaHome, FaPhone, FaUniversity, FaUser, FaBirthdayCake, FaVenusMars, FaCrown, FaShieldAlt } from "react-icons/fa";
import{BsArrowBarRight} from "react-icons/bs"
import { Link } from 'react-router-dom';
function App() {
  const [data, setData] = useState({})
  useEffect(() => {
    getList()
  }, [])

  function getList(){
    fetch("https://dummyjson.com/users").then((result) => {
      result.json().then((value) => {
        setData(value)
      })
    })
  }
  console.log(data);
  
  function deleteData(id) {
    fetch(`https://dummyjson.com/users/${id}`,{
      method: "DELETE"
    })
    .then((result) => {
      result.json().then(() => {
        setData((prevData) => ({
          ...prevData,
          users: prevData.users.filter((value) => value.id !== id)
        }))
      })
    })
  }

  return (
    <div className="App">
      <h1>API Call</h1>
      <div className="user-grid">
        {Array.isArray(data.users) && data.users.map((info) => (
          <div className="user-info" key={info.id}>
            <div className="user-img">
              <img src={info.image} alt="user" />
            </div>
            <div className="user-data">
              <h5><FaUser style={{ color: "#3498db" }} /> Name: {info.firstName} {info.lastName}</h5>
              <h5><FaBirthdayCake style={{ color: "#3498db" }} /> Age: {info.age}</h5>
              <h5>{info.role === 'admin' && <FaCrown style={{ color: "#3498db" }} /> }
                  {info.role === 'moderator' && <FaShieldAlt style={{ color: "#3498db" }} /> } 
                  {info.role === 'user' && <FaUser style={{ color: "#3498db" }} /> } Role: {info.role}</h5>
              <h5><FaVenusMars style={{ color: "#3498db" }} /> Gender: {info.gender}</h5>
              <h5><FaEnvelope style={{ color: "#3498db" }} /> Email: {info.email}</h5>
              <h5><FaPhone style={{ color: "#3498db" }} /> Phone: {info.phone}</h5>
              <h5><FaUniversity style={{ color: "#3498db" }} /> University: {info.university}</h5>
              <h5><FaHome style={{ color: "#3498db" }} /> Address: {info.address.address}, {info.address.city}, {info.address.country}</h5>
            </div>
            <div className="info-buttons">
              <button className='delete-btn' onClick={() => deleteData(info.id)}>Delete <BsArrowBarRight className='arrow-btn'/></button>
              <Link
                to={`/about/${info.id}`}
                className='profile-btn'
                state={{ user: info }}
              >
                View Profile <BsArrowBarRight className='arrow-btn' />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
}

export default App;
