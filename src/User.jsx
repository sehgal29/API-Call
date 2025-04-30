import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import{BsArrowBarLeft} from "react-icons/bs"
import './User.css';

const User = () => {
  const {id} = useParams();
  const[info, setInfo] = useState(null);
  const[error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://dummyjson.com/users/${id}`)
    .then((res) => {
        if(!res.ok) {
            throw new Error("User not found")
        }
        return res.json();
    })
    .then((data) => {
        setInfo(data);
    })
    .catch(() => {
        setError(true)
    })
  }, [id])

  if(!info) return <div className='loading'>loading...</div>
  if(error) return <div className='error'>User not found with ID: {id}</div>
  return (
    <div className="user-container">
      <div className="user-card">
        <Link to={'/'} className='go-back'> <BsArrowBarLeft className='left-arrow' style={{color: '#3498db'}}/> Go back</Link>
        <img src={info.image} alt="user" className="user-img" />
        <h2>{info.firstName} {info.lastName}'s Profile</h2>
        <p><strong>Username:</strong> {info.username}</p>
        <p><strong>Email:</strong> {info.email}</p>
        <p><strong>Phone:</strong> {info.phone}</p>
        <p><strong>Gender:</strong> {info.gender}</p>
        <p><strong>Age:</strong> {info.age}</p>
        <p><strong>Birth Date:</strong> {info.birthDate}</p>
        <p><strong>Blood Group:</strong> {info.bloodGroup}</p>
        <p><strong>Eye Color:</strong> {info.eyeColor}</p>
        <p><strong>Hair:</strong> {info.hair.color}, {info.hair.type}</p>
        <p><strong>Height:</strong> {info.height} cm</p>
        <p><strong>Weight:</strong> {info.weight} kg</p>
        <p><strong>IP Address:</strong> {info.ip}</p>
        <p><strong>MAC Address:</strong> {info.macAddress}</p>
        <p><strong>SSN:</strong> {info.ssn}</p>
        <p><strong>University:</strong> {info.university}</p>
        <p><strong>Address:</strong> {info.address.address}, {info.address.city}, {info.address.state}, {info.address.country} ({info.address.postalCode})</p>

        <hr />
        <h3>Bank Details</h3>
        <p><strong>Card Type:</strong> {info.bank.cardType}</p>
        <p><strong>Card Number:</strong> {info.bank.cardNumber}</p>
        <p><strong>Card Expiry:</strong> {info.bank.cardExpire}</p>
        <p><strong>Currency:</strong> {info.bank.currency}</p>
        <p><strong>IBAN:</strong> {info.bank.iban}</p>

        <hr />
        <h3>Company Details</h3>
        <p><strong>Company Name:</strong> {info.company.name}</p>
        <p><strong>Department:</strong> {info.company.department}</p>
        <p><strong>Title:</strong> {info.company.title}</p>
        <p><strong>Company Address:</strong> {info.company.address.address}, {info.company.address.city}, {info.company.address.state} ({info.company.address.postalCode})</p>

        <hr />
        <h3>Crypto Wallet</h3>
        <p><strong>Coin:</strong> {info.crypto.coin}</p>
        <p><strong>Network:</strong> {info.crypto.network}</p>
        <p><strong>Wallet Address:</strong> {info.crypto.wallet}</p>
      </div>
    </div>
  );
};

export default User;
