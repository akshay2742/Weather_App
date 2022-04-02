import React, { useState, useEffect } from 'react'
import '../components_css/WeatherCard.css'
import sun from '../images/icons8-sun.svg'

function WeatherCard(props) {

  return (
    <div className='weather_container'>
        <div className='container weather_content'>
            <div className='climate_figure'>
                <img src={sun} alt='weather_icon' className='sun'/>
            </div>
            <div className='temp_info'>
                <div className='place'>
                    <h1>{props.temp} &#8451;</h1>
                    <h2>{props.city}</h2>
                    <h3>{props.country}</h3>
                </div>
            </div>
            <div className='other_info'>
                <div className='other_info_title'>
                    <p>Weather Condition</p>
                    <p>Air Quality</p>
                    <p>Humidity</p>
                </div>
                <div className='other_info_value'>
                    <p>~</p>
                    <p>{props.air}</p>
                    <p>{props.humidity}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WeatherCard