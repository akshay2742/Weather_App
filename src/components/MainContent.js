import React, { useState} from 'react'
import '../components_css/main.css'
import { faCloud} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WeatherCard from './WeatherCard';
import 'animate.css'


function MainContent() {

    const [tempCity, setTempCity] = useState('');
    const [tempCountry, setTempCountry] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');


    const searchHandler = (e) => {
        if(city.length === 0 || country.length === 0) {
            alert('Please enter both city and country');
        }
        else {
            setTempCity(city);
            setTempCountry(country);
        }
        e.preventDefault();
    }

  return (
    <>
        <div className='main_container'>
            <div className='inner_container'>
                <div className='inner_navbar'>
                    <div className='nav_icons'>
                        <div className='circle_dot_green'></div>
                        <div className='circle_dot_yellow'></div>
                        <div className='circle_dot_red'></div>
                    </div>
                </div>
                <div className='inner_content'>
                    <div className='input_values'>
                        <div className='input_card'>
                            <div className="container input_form">
                                <p className='input_heading'>"Know the weather near you!" <FontAwesomeIcon icon={faCloud} /></p>
                                <input  type="text" value={city} onChange={(e) => {setCity(e.target.value)}} placeholder="Enter the city" />
                                <input  type="text" value={country} onChange={(e) => {setCountry(e.target.value)}} placeholder="Enter the country" />
                                <button className='search_button' onClick={searchHandler}>Search</button>
                            </div>
                        </div>
                    </div>
                    <div className='output_values'>
                        <WeatherCard city={tempCity} country={tempCountry}/>
                    </div>
                </div>
            </div>
            <div className='personal'>
                <div className='personal_info'>
                    <div className='social'>
                        <button className='social_button' 
                            onClick={e => {
                                e.preventDefault();
                                window.location.href='https://www.linkedin.com/in/akshaysharma274/'
                            }}
                            >
                            <span>🧐</span> About Me
                        </button>
                    </div>
                    <div className='github'>
                        <button className='fork' 
                            onClick={e => {
                                e.preventDefault();
                                window.location.href="https://github.com/akshay2742/weather_app/fork"
                            }}
                                >
                            <span>⭐</span> Fork Project
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default MainContent