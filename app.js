document.addEventListener("DOMContentLoaded", function () {

    const url = 'http://api.openweathermap.org/data/2.5/'
    const apiID = 'fd8de74bb30e63fa5bdd052cabd79493'
    const iconUrl = 'http://openweathermap.org/img/w/'
    const cityInput = document.querySelector('#city')
    const checkWeatherButton = document.querySelector('#check-weather')
    const icon = document.querySelector('#icon')

    // icon.style.display = 'none';

    const getWeatherData = (e) => {
        e.preventDefault();
        const city = cityInput.value

        if (city != "") {
            const query = `?q=${city}&APPID=${apiID}`

            axios.get(`${url}weather${query}`)
                .then(response => {
                    displayWeatherNow(response.data)
                })
                .catch(error => {
                    console.log('ERROR:',error);
                })

            axios.get(`${url}forecast${query}`)
                .then(response => {
                    displayWeatherForecast(response.data.list)
                })
                .catch(error => {
                    console.log('ERROR:', error);
                })

        } else { alert("Input city name") }
    }

    const displayWeatherForecast = (data) => {
        const forecastDisplayRow = document.querySelector('#weather-forecast').querySelector('.row');
        forecastDisplayRow.textContent = '';

        for (let i = 0; i < 9; i++) { // creates 9 columns with forecast data
            let div = document.createElement('div');
            div.classList.add('column')
            div.classList.add('nineth');

            let temp = document.createElement('div');
            temp.classList.add('temp');
            let icon = document.createElement('div');
            let time = document.createElement('div');
            
            temp.innerText = `${(Number(data[i].main.temp) - 273.15).toFixed(1)} C`;
            const iconImg = document.createElement('img');
            iconImg.src = `${iconUrl}${data[i].weather[0].icon}.png`;
            iconImg.alt = "weather icon";
            iconImg.classList.add = 'img-small'
            icon.appendChild(iconImg);
            
            time.innerText = `${data[i].dt_txt.slice(5, 10)} `;
            time.innerText += data[i].dt_txt.slice(-8, -3);
            
            div.appendChild(temp)
            div.appendChild(icon)
            div.appendChild(time)
            forecastDisplayRow.appendChild(div);
        }
        document.querySelector('#weather-forecast').style.display = 'block'
    }

    const displayWeatherNow = (data) => {
        const ids = ['name', 'coords', 'description', 'humidity', 'pressure', 'windspeed', 'winddeg', 'temp', 'icon'];
        const disp = {};

        ids.forEach( id => {
            disp[id] = document.querySelector('#' + id)
        })

        disp.name.innerText = `${data.name} `;
        let country = document.createElement('span');
        country.innerText = ` ( ${data.sys.country} ) `;
        country.setAttribute("id", "country");
        disp.name.appendChild(country);

        disp.coords.innerText = `Latitude: ${data.coord.lat}, Longitude: ${data.coord.lon}`;
        disp.description.innerText = `Now: ${data.weather[0].description}`;
        disp.humidity.innerText = `Humidity: ${data.main.humidity} % `;
        disp.pressure.innerText = `Pressure: ${data.main.pressure} hPa`;
        disp.windspeed.innerText = `Wind speed: ${data.wind.speed} km/h`;
        disp.winddeg.innerText = `Wind direction: ${data.wind.deg} deg`;
        disp.temp.innerText = `Temperature: \n${(Number(data.main.temp) - 273.15).toFixed(1)} C | ${(Number(data.main.temp)*9/5-459.67).toFixed(1)} F`;

        icon.src = `${iconUrl}${data.weather[0].icon}.png`
        icon.style.display = 'block';

        document.querySelector('#weather-now').style.display = 'block'

    }

    checkWeatherButton.addEventListener('click', getWeatherData)

});