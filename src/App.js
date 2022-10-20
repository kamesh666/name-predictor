import React, { useState } from 'react';
import users from './img/60111.jpg'
import allCountries from './json/jsonformatter.json'
import axios from 'axios'

function App() {

  const [name,setName] = useState('')
  const [response,setResponse] = useState();
  const [loading,setLoading] = useState(false);

  const Search = (e) => {
    e.preventDefault();
    setLoading(true)
    axios.get('https://api.nationalize.io/?name=' + name)
    .then(res=> 
      {
        const obj = {};
        const countries = res.data.country;

        res.data.country.forEach((c,i) => {
          obj[c.country_id] = i;
        });

        allCountries.forEach(c => {
          if(obj[c.abbreviation] >=0) {
            countries[obj[c.abbreviation]].fullName = c.name
          }
        })
      setResponse(countries)
      setLoading(false)
    })
  };


  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center ">
      <div className="card border-0" style={{width: "25rem"}}>

        {/* Header Start */}
        <nav className="navbar navbar-dark bg-dark rounded">
          <div className="container-fluid">
            <form className="d-flex w-100" onSubmit={Search} role="search">
              <input 
                value={name}
                onChange={(e)=> {
                  setName(e.target.value)
                  if (e.target.value === '') {
                    setResponse(null)
                  }
                }}
                className="form-control me-2" 
                type="search" placeholder="Enter your name..." aria-label="Search" 
              />
              <button 
                className="btn btn-outline-light" 
                type="submit">predict
              </button>
            </form>
          </div>
        </nav>
        {/* Header end */}

        {/* User Image */}
        {
          (response == null) ? 
          <img 
          src={users} 
          className="card-img-top w-50 mx-auto p-3 rounded-circle" 
          alt="User profile"
        />
        :
        <img 
          src='https://media.giphy.com/media/26ufez3dCwPtxrDt6/giphy-downsized-large.gif'
          className="card-img-top w-50 mx-auto p-3 rounded-circle" 
          alt="User profile"
        />

        }
        

        

        {/* card body Start */}
          <div className="card-body">
           <h5 className="card-title">Predictor</h5>
           <h6>Your Name is : {name}</h6>

           <ul className="list-group">
            {
              loading ?
                <div className="spinner-border text-primary align-items-center" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              :
              (
                (response?.length === 0) ?
                <div className='alert alert-danger text-center' role='alert'>
                  No result found
                </div>
              :
              (
                response?.map((coun)=> {
                  return (
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">{coun.fullName}</div>
                      </div>
                      <span className="badge bg-primary rounded-pill">{(coun.probability * 100).toFixed(2)}%</span>
                    </li>
                  )
                })
              )
              )
            }
           </ul>
          </div>
      </div>
    </div>
  );
}

export default App;
