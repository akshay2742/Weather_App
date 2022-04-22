import React, { useState, useEffect, useRef } from 'react'
import '../components_css/WeatherCard.css'
import temp_icon from '../images/icons8-temperature-40.png'
import humidity_icon from '../images/icons8-humidity-40.png'
import condition_icon from '../images/icons8-weather-news-40.png'
import axios from 'axios';
import 'animate.css'


function WeatherCard(props) {

    const [temp, setTemp] = useState('');
    const [humidity, setHumidity] = useState('');
    const [condition, setCondition] = useState('');
    const [icon, setIcon] = useState('10d');

    const [location, setLocation] = useState('');

    let image = `http://openweathermap.org/img/wn/${icon}@2x.png`

    const prevCityRef = useRef();
    useEffect(() => {
        prevCityRef.current = props.city;
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${props.city},${props.country}&appid=5bc775205e68f6b982b87654ca6166ce`)
            .then(res => {
                setTemp((res.data.main.temp-273.15).toPrecision(2) + '°C');
                setHumidity(res.data.main.humidity+'%');
                setCondition(res.data.weather[0].main);
                setLocation(`${props.city}, ${props.country}`);
                setIcon(res.data.weather[0].icon);
            })
            .catch(err => {
                setTemp('');
                setHumidity('');
                setCondition('');
                setLocation('');
                setIcon('10d');
                alert('Please enter a valid city and country');
            })
    },[props.city,props.country]) 

    const style = prevCityRef.current === props.city? "" : "animate__animated animate__fadeIn";

  return (
      <div className='container output_screen'>
          <div className='weather_icon'>
              <img src={image} alt='weather icon' />
          </div>
          
          <h1 className={`${style}`}>{location.toUpperCase()}</h1>
          <div className='weather_info'>
            <div className='container temperature'>
                <h2 className='left'>Temperature<img src={temp_icon} alt='temp_icon'/></h2>
                <h2 className={`${style} right`}>{temp}</h2>
            </div>
            <hr></hr>
            <div className='container temperature'>
                <h2 className='left'>Humidity <img src={humidity_icon} alt='humdity_icon'/></h2>
                <h2 className={`${style} right`}>{humidity}</h2>
            </div>
            <hr></hr>
            <div className='container temperature'>
                <h2 className='left'>Conditions <img src={condition_icon} alt='condition_icon'/></h2>
                <h2 className={`${style} right`}>{condition}</h2>
            </div>
          </div>
      </div>
  )
}

export default WeatherCard