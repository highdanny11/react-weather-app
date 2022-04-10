import React, { useState, useEffect, useMemo } from 'react';
import WeatherCard from './views/WeatherCard'
import WeatherSetting from './views/WeatherSetting';
import useWeatherAPI from './hooks/useWeatherAPI'
import { getMoment, findLocation } from './utils/helper'
import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';


const Container = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const theme = {
  light: {
    backgroundColor: '#ededed',
    foregroundColor: '#f9f9f9',
    boxShadow: '0 1px 3px 0 #999999',
    titleColor: '#212121',
    temperatureColor: '#757575',
    textColor: '#828282',
  },
  dark: {
    backgroundColor: '#1F2022',
    foregroundColor: '#121416',
    boxShadow:
      '0 1px 4px 0 rgba(12, 12, 13, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.15)',
    titleColor: '#f9f9fa',
    temperatureColor: '#dddddd',
    textColor: '#cccccc',
  },
};

const AUTHORIZAIION_KEY = 'CWB-07CD6226-46AC-47C8-9315-AADAEC1A6C3D'

function App() {
  const storageCity = localStorage.getItem('cityName') || '臺北市'
  const [currentCity, setCurrentCity] = useState(storageCity)
  const currentLocation = useMemo(() => findLocation(currentCity), [currentCity])
  const { cityName, locationName, sunriseCityName, } = currentLocation

  const [weatherElement, fetchData] = useWeatherAPI({
    locationName: locationName,
    cityName: cityName,
    authorizationKey: AUTHORIZAIION_KEY
  })
  const moment = useMemo(() => getMoment(sunriseCityName), [sunriseCityName])

  useEffect(() => {
    setCurrenttheme(moment === 'day' ? 'light' : 'dark')
  }, [moment])

  const [currentTheme, setCurrenttheme] = useState('light')




  const [currentPage, setCurrentPage] = useState('WeatherCard')
  const handleCurrentPageChange = (currentPage) => {
    setCurrentPage(currentPage)
  }

  const handlerCurrentCityChange = (currentCity) => {
    setCurrentCity(currentCity)
  }

  return (
    <ThemeProvider theme={theme[currentTheme]}>
      <Container>
        {currentPage === 'WeatherCard' && (<WeatherCard
          cityName={cityName}
          weatherElement={weatherElement}
          moment={moment}
          fetchData={fetchData}
          handleCurrentPageChange={handleCurrentPageChange}
        />)}
        {currentPage === 'WeatherSetting' && <WeatherSetting
          cityName={cityName}
          handleCurrentPageChange={handleCurrentPageChange}
          handlerCurrentCityChange={handlerCurrentCityChange} />}
      </Container>
    </ThemeProvider>

  );
}

export default App;
