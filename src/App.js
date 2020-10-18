import React,{useState} from 'react';
import './App.css';

const api = {
  key: "eee58310139b3f3a56c854761070a234",
  base:"https://api.openweathermap.org/data/2,5"
}



function App() {
  const [query,setQuery] = useState('')
  const [weather,setWeather] = useState({})

  const search = evt => {
    if(evt.key === "Enter"){
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${api.key}`)
          .then(res => res.json())
          .then(result => {
            setQuery('')
            setWeather(result)
            console.log(weather)
          })
    }
  }

  const dateBuilder = (d) => {
    let months = ["January","Febuary","March","April","May","June","July",
    "August","Septemper","October","November","December"]
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]

    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={
      (typeof weather.main != 'undefined') ? ((weather.main.temp > 16) ? 'App warm' : 'App') : 'App'
    }>
      <main>
        <h1>Look For Weather where you want</h1>
        <div className="search-box">
          <input type="text" className="search-bar" placeholder="Search..."
          onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search}  />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
        <div className="location-box">
          <div className="location">{weather.name}, {weather.sys.country}</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className="weather-box">
          <div className="temp">
           {Math.round(weather.main.temp)} °C
          </div>
          <div className="weather">{weather.weather[0].main }</div>
        </div>
        </div>
        ):('')}
      </main>
    </div>
  );
}

export default App;
