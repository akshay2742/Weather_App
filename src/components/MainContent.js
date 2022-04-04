import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import { styled } from '@material-ui/core/styles'
import '../components_css/main.css'
import { Box } from '@material-ui/core';
import TextField from '@material-ui/core/TextField'
import WeatherCard from './WeatherCard';
import axios from 'axios';

const InputField = styled(TextField)({
    '& label.Mui-focused': {
      color: 'black',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'black',
    },
    '& .MuiInput-underline:before':{
        borderBottomColor: 'black',
    },
    '&:hover .MuiInput-underline:before': {
        borderBottomColor: 'black',
    },
    '& .MuiFormLabel-root':{
        color: 'black',
    },
    '& .MuiInputBase-input':{
        color: 'black',
    }
  });
  
function MainContent() {

    const [city, setCity] = useState('~');
    const [country, setCountry] = useState('~');

    const [PassCity, setPassCity] = useState('~');
    const [PassCountry, setPassCountry] = useState('~');

    const [temp, setTemp] = useState('~');
    const [humidity, setHumidity] = useState('~');
    const [weather, setWeather] = useState('~');
    const [air, setAir] = useState('~');

    const [longitude , setLongitude] = useState('');
    const [latitude , setLatitude] = useState('');
    const [icon, setIcon] = useState('10d');

    const UpdateCity = (event) => {
        setCity(event.target.value);
    }
    const UpdateCountry = (event) => {
        setCountry(event.target.value);
    }
    
    const ChangeHandler = (event) => {
        event.preventDefault();
        
        let value = `${city},${country}`;
        
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=5bc775205e68f6b982b87654ca6166ce`)
        .then(res => {
            let temp_value = res.data.main.temp-273.15;
            setTemp(temp_value.toPrecision(3));
            setHumidity(res.data.main.humidity);
            setLongitude(res.data.coord.lon);
            setLatitude(res.data.coord.lat);
            console.log(longitude);
            console.log(latitude);
            setWeather((res.data.weather[0].description).toUpperCase());
            setIcon(res.data.weather[0].icon);
            setPassCity(city);
            setPassCountry(country);
        })
        .catch(err => {
            alert('Please enter a valid city and country');
            setTemp('');
            setHumidity('~');
            setWeather('~');
            setIcon('10d');
            setPassCity('');
            setPassCountry('');
        })
        
        axios.get(`http://api.airvisual.com/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=b22c933d-3f10-420e-89a7-377191d70f95`)
        .then(res => {
            console.log(res)
            setAir(res.data.data.current.pollution.aqius);
        })
        .catch(err => {
            setAir('~');
        })
        
    }

  return (
    <>
        <div className='main_container'>
            <div className='container'>
                <h2 className='main_title' align='center'>Weather App</h2>
            </div>
            <div className='container inputs'>
                <div className='Input'>   
                    <InputField id="standard-basic" label="City/Town" variant="standard" value={city} onChange={UpdateCity} />
                </div>  
                <div className='Input'>
                    <InputField id="standard-basic" label="Country" variant="standard" value={country} onChange={UpdateCountry} />   
                </div>
                <Box className='submit_button'>
                    <Button variant="contained" size="medium" onClick={ChangeHandler}>Submit</Button>
                </Box>
                
            </div>
            <WeatherCard city={PassCity} country={PassCountry} temp={temp} air={air} humidity={humidity} weather={weather} icon={icon}/>
        </div>
        
    </>
  )
}

export default MainContent