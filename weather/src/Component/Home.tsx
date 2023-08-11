
import React, { useState, useEffect } from 'react';
import '../style.css'
import WeatherData from './WeatherData';

const Home: React.FC = () => {
     // State to hold weather data
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
        // Default city to display and search
    const [city, setCity] = useState<string>('Accra');
    // State to hold current time
    const [currentTime, setCurrentTime] = useState<string>('');

    // Fetches current time and updates it every second
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            setCurrentTime(`As of ${hours}:${minutes}:${seconds}`);
        }, 1000);

                // Cleanup function to clear the interval when component unmounts
        return () => {
            clearInterval(interval);
        };
    }, []);
     // Handles city input change
    const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCity(event.target.value);
    };
      // Handles city search
    const handleSearch = async () => {
        try {
            const apiKey = 'dbd3b02d8958d62185d02e944cd5f522';
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

            const response = await fetch(apiUrl);
            if (response.ok) {
                const data = await response.json();
            //   console.log(data);
                setWeatherData(data);
        } else {
            setWeatherData(null); // City not found
        }
    }catch (error) {
        console.error('Error fetching weather data:', error);
        setWeatherData(null);
    }
};
    // Fetch default city weather data on initial load
     useEffect(() => {
      handleSearch();
     },  []);

     // JSX structure for rendering the Weather App
return (
    <>
        <div className='container'>
            <div className='weather'>
                <h1 className='title'>Weather App</h1>

                <div className='input-container'>
                    <div className='input-field '>
                        <input
                            type="text"
                            placeholder='Enter City Name'
                            className='input'
                            value={city}
                            onChange={handleCityChange}
                        />
                    </div>
                    <button className='button' onClick={handleSearch}>Search</button>
                </div>

            </div>
            <div className='frame '>
                <div className='display-city'>
                    <div className='weater-title'>
                        <p className='city'>
                            {weatherData?.name ? `${weatherData.name}, ${weatherData.sys.country}, Weather` : 'City Not Found'}</p>
                    </div>
                    <div className='time-title'>
                        <p> {currentTime}</p>
                    </div>
                </div>
                <div className='degrees celcius'>
                    <div className='degrees-text  '>
                    {weatherData ? `${(weatherData.main.temp - 273.15).toFixed(2)} °C` : ''}
                    </div>

                </div>
                <div className='overcast font text'>
                    <p>{weatherData?.weather[0]?.description}</p>

                </div>

            </div>
            <div className='Temproperties'>
                <div className='Temproperties1'>
                    <div className='high dotted-line'>
                        <div className='highprop '>High/Low</div>
                        <div className='highvalues '> {weatherData ? `${(weatherData.main.temp_min - 273.15).toFixed(2)} ` : ''}/ {weatherData ? `${(weatherData.main.temp - 273.15).toFixed(2)} ` : ''}°C</div>
                    </div>
                    <div className='high dotted-line'>
                        <div className='highprop'>Humidity</div>
                        <div className='highvalues'>{weatherData?.main.humidity}</div>
                    </div>
                    <div className='high dotted-line'>
                        <div className='highprop'>Pressure</div>
                        <div className='highvalues'>{weatherData?.main.pressure} hpa</div>
                    </div>
                    <div className='high dotted-line'>
                        <div className='highprop'>Visibility</div>
                        {weatherData ? (weatherData.visibility / 1000).toFixed(2) + ' km' : ''}
                    </div>
                    <div className='high dotted-line'>
                    </div>
                </div>

                <div className='Temproperties2'>
                    <div className='wind1 dotted-line'>
                        <div className='highprop'>Wind</div>
                        <div className='highvalues'>{weatherData?.wind.speed} Km /hr</div>
                    </div>
                    <div className='wind1 dotted-line'>
                        <div className='highprop'>Wind Direction</div>
                        <div className='highvalues humidityp'>{weatherData?.wind.deg}deg</div>
                    </div>
                    <div className='wind1 dotted-line'>
                        <div className='highprop'>Sunrise</div>
                        {weatherData ? new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                        {/* <div className='highvalues'>{weatherData?.sys.sunrise}am</div> */}
                    </div>
                    <div className='wind1 dotted-line'>
                        <div className='highprop'>Sunset</div>
                        {weatherData ? new Date(weatherData.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                    </div>
                 
                </div>
            </div>

        </div>
    </>
);
};

export default Home;