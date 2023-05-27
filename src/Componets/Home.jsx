import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faWind } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import {TailSpin} from 'react-loader-spinner'
function Home() {
  const [accessKey, setAccessKey] = useState("fab19fca7d06402a862112004232505");
  const [city, setCity] = useState("Karatina");

const [weatherData, setWeatherData] = useState(null)
  const [hold, setHold] = useState("")
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const [errorMessage, setErrorMessage] = useState("No location found")
  const [loading, setLoading] = useState(false)
 const formatTime = (d)=>{
  

    const formattedDateTime = new Date(d).toLocaleString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    })
  return formattedDateTime
 }

   useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await Axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=${accessKey}&q=${city}&days=5`
        );
        setWeatherData(response.data);
        console.log(response.data);
        setShowErrorMessage(false)
      } catch (error) {
        console.error(error);
        setShowErrorMessage(true)
      }finally{
        setLoading(false)
      }
    };

    fetchData();
  }, [accessKey, city]);
  const takeInp = e =>setHold(e.target.value)
  const handleSearch = ()=>{
  
    setCity(hold)
  }
  if(weatherData){
    console.log(weatherData.current);
    console.log(weatherData.forecast.forecastday);
    console.log(weatherData.forecast);
  }

  return (
    <div id='body'>
      <div id='main3'>
   
      </div>
      
      <div id='main2'>
        {weatherData&&(
        <div id='section1'>
        {/* <h1>Current time:{formatTime(weatherData.location.localtime)}</h1> */}
        </div>
        )}
       <div id="section2">
        {weatherData &&(
          <div id='currentFeelsLike'>
          <h1>It's {weatherData.current.condition.text}</h1>
          {/* <img id='imgIcon' src={weatherData.current.condition.icon} alt="" srcset="" /> */}
          </div>
        )}
       </div>
    
        
      </div>
      <div id='main1'>
      <div id="search">
        <div id='location'>
      <FontAwesomeIcon icon={faMapMarkerAlt} />
      </div>
      <input type="text" id='searchInp' placeholder='Search location' onChange={takeInp}/>
          <button id='searchBtn' onClick={handleSearch}><FontAwesomeIcon  icon={faSearch} className="transparent-background" size='2x'  /></button>
      </div>
      {showErrorMessage &&(
        <div id='errorMsg'>
          <h5>{errorMessage}</h5>
        </div>
      )}
      <div id="temp">
      {weatherData && (
            <div id='subDt'>
              <h2 id='topLocation'><FontAwesomeIcon icon={faMapMarkerAlt} /> {weatherData.location.name}/{weatherData.location.country}</h2>
              <h1 id='deg'>{weatherData.current.temp_c}&deg;C</h1>
             
              <div id='wind'>
              <FontAwesomeIcon icon={faWind} />
              <h3>{weatherData.current.wind_dir} / {weatherData.current.wind_kph}km/h</h3>
              </div>
            </div>
          )}
          <div id='foreCast'>
            <h2 id='wind'>The Next Days Forecast:</h2>
            <h3>5 days</h3>
           {weatherData && weatherData.forecast.forecastday.map(data=>{
           return(
            
            <div id='dataForecast'>
              {loading ?(
                  <TailSpin color='grey' radius={"8px"}/>
              ):(
                <>               
                 <img src={data.day.condition.icon} alt="this is an icon"  />
                <div id='formatTime'>
                 <h5 id='resDate'>{formatTime( data.date)}</h5>
                 <h6 id='dataToHide'>{data.day.condition.text}</h6>
                 </div>
                 <div id='forcastTemp'>
                  <h5>{data.day.maxtemp_c}&deg;</h5>
                  <h5>{data.day.mintemp_c}&deg;</h5>
                 </div>
                 </>

              )}
             
        
            </div>
           )
           
           })}
          </div>
      </div>
      </div>
      
    </div>
  );
}

export default Home;
