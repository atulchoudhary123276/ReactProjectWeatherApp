import { useEffect, useState } from 'react'
import "./style.css";
import './App.css'



function App() {

  const [city, setCity] = useState(400)
  const [search, setSearch] = useState();
  const [refreshKey, setRefreshKey] = useState(0);
  useEffect(() => {
    async function fetchApi() {
      const url = `http://api.weatherapi.com/v1/current.json?key=56a26b3710004e458b0170535232209&q=${search}&aqi=no`;

      try {
        const response = await fetch(url);
        const result = await response.json();
        if (response.status == 200) {
          setCity(result);
          console.log(result)
        }
        else {
          setCity(response.status)
          // console.log(response.status)
        }
      }
      catch (e) {
        console.log(e);
      }


    }

    fetchApi();
  }, [search])

  useEffect(() => {
    function findLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
      }
      else {
        console.log("Geolocation not supported");
      }


      async function success(position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        //  console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        const url = `http://api.weatherapi.com/v1/current.json?key=56a26b3710004e458b0170535232209&q=${latitude},${longitude}&aqi=no`;

        try {
          const response = await fetch(url);
          const result = await response.json();
          if (response.status == 200) {
            setCity(result);
            console.log(result)
          }
          else {
            setCity(response.status)
            console.log(response.status)
          }
        }
        catch (e) {
          console.log(e);
        }
      }
      function error() {
        console.log("Unable to retrieve your location");
      }


    }
    findLocation();
  }, [refreshKey])
  const handleCreateUser = (user) => {
    createUser(user).then((users) => {
      // Refresh the effect by incrementing 1
      setRefreshKey(oldKey => oldKey +1)
    });
};

  return (
    <>
      <div className="container">
        <h3><span>W</span>eather <span>A</span>pp</h3>
        <input type="search" placeholder='entre city name' value={search} onChange={(e) => { setSearch(e.target.value) }} />
        <div className="box">
          {city == 400 ? (<div>
            <i className="fa-solid fa-triangle-exclamation fa-beat fa-xl" style={{ color: "#f3121d" }}></i>
            <p style={{color:"black"}}>No data Found</p>
            </div>
          ) : (
            <>


              <p className='para'>{city.location.name}</p>
              <div className="temp">
                <p>{city.current.temp_c}<span>&#8451;</span></p>
                <div className="minmax">
                  <p>max: {(city.current.temp_c + 3).toFixed(0)}<span>&#8451;</span></p>
                  <p>min: {(city.current.temp_c - 2).toFixed(0)}<span>&#8451;</span></p>
                </div>
              </div>
             
              <img className='img' src={`https:${city.current.condition.icon}`}alt="img" />
              <p className='imgText'>{city.current.condition.text}</p>
              <div className="otherdesc">
                <div>{city.current.feelslike_c}<span>&#8451;</span>
                  <p>Feels like</p>
                </div>

                <div>{city.current.humidity}%
                  <p>Humidity</p>
                </div>

              </div>
             <p className='footer'>{city.location.region}|{city.location.country}</p>
            </>
          )}
        </div>
        
        <p><i className="fa-regular fa-copyright fa-fade " style={{color: "#361fa8"}}></i> 2023 atul.inc | All rights reserved</p>
      </div>

    </>
  );
};

export default App
