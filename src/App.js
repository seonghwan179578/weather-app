import { useEffect,useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';

// 1. 앱이 실행되자마자 위치 기반의 날씨가 보인다
// 2. 도시, 섭씨, 화씨, 날씨 상태 정보가 보인다
// 3. 5개의 버튼이 있다(1개는 현재위치, 4개는 다른 도시)
// 4. 도시 버튼을 클릭할 때마다 도시별 날씨가 나온다
// 5. 현재 위치 기반 날씨 버튼을 클릭하면 다시 현재 위치 기반으로 돌아온다
// 6. 데이터를 가져오는 동안 로딩 스피너가 돈다

function App() {
  
  const [weather,setWeather]=useState(null)
  const [city,setCity]=useState('')
  const cities=['paris','new york','tokyo','seoul']
  const getCurrentLocation=()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat = position.coords.latitude // 위도 정보
      let lon = position.coords.longitude // 경도 정보
      getWeatherByCurrentLocation(lat,lon)
    })
  }

  // api 호출
  const getWeatherByCurrentLocation = async(lat,lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=20c6148043e79a4941979cb598def5a0&units=metric`
    let response = await fetch(url)
    let data = await response.json()
    setWeather(data)
  }

  const getWeatherByCity=async()=>{
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=20c6148043e79a4941979cb598def5a0&units=metric`
    let response = await fetch(url)
    let data = await response.json()
    setWeather(data)
  }

  useEffect(()=>{
    if(city == "") {
      getCurrentLocation()
    }else {
      getWeatherByCity()
    }
  },[city])
  
  

  return (
    <div>
      <div className='container'>
     <WeatherBox weather={weather}></WeatherBox>
     <WeatherButton cities={cities} setCity={setCity}></WeatherButton>
     </div>
    </div>
  );
}

export default App;
