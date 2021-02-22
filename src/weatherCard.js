import React from "react";
import keys from "./keys";
import './weatherCard.css'
import Card from 'react-bootstrap/Card'

const api = {
    key: keys.OWM_API_KEY,
    base: keys.OWM_BASE_URL,
};

class WeatherCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weather: {},
            lastUpdated: "",
        }

        setTimeout(() => {
            this.updateWeatherData()
        }, 500);
        setInterval(() => {
            this.updateWeatherData()
        }, 5 * 60 * 1000); // Every 5 minutes};
    }

    updateWeatherData() {
        console.log("Requesting weather")
        fetch(`${api.base}weather?q=Tegucigalpa&units=imperial&APPID=${api.key}`)
            .then((res) => res.json())
            .then((result) => {
                this.setState({ weather: result, lastUpdated: dateDisplay() });
                console.log(JSON.stringify(result));


            });

        // this.setState({ weather: { "coord": { "lon": -87.2068, "lat": 14.0818 }, "weather": [{ "id": 802, "main": "Clouds", "description": "scattered clouds", "icon": "03d" }], "base": "stations", "main": { "temp": 22.89, "feels_like": 22.6, "temp_min": 22.78, "temp_max": 23, "pressure": 1019, "humidity": 64 }, "visibility": 10000, "wind": { "speed": 3.09, "deg": 70 }, "clouds": { "all": 40 }, "dt": 1613946559, "sys": { "type": 1, "id": 7102, "country": "HN", "sunrise": 1613909378, "sunset": 1613951730 }, "timezone": -21600, "id": 3600949, "name": "Tegucigalpa", "cod": 200 } })
    }

    render() {
        var iconURL = ""
        var now = new Date()
        var weatherDescription = ""
        var extraClasses = ""

        if (typeof this.state.weather.main != "undefined") {
            // Night or day?
            if (now.getHours() > 20 || now.getHours() < 6) {
                extraClasses += " night"
            } else {
                extraClasses += " day"
            }

            // Very hot or cold?
            if (this.state.weather.main.temp > 85) {
                extraClasses += " hot"
            } else if (this.state.weather.main.temp < 55) {
                extraClasses += " cold"
            }

            // Type of weather
            var weatherID = this.state.weather.weather[0].id
            if (weatherID >= 200 && weatherID < 300) {
                // Thunderstorm
                weatherDescription = "T-Storms"
                extraClasses += " storm"
            } else if (weatherID < 400) {
                // Drizzle
                weatherDescription = "Drizzle"
                extraClasses += " fog"
            } else if (weatherID < 600) {
                // Rain
                weatherDescription = "Rain"
                extraClasses += " storm"
            } else if (weatherID === 701) {
                // Mist
                weatherDescription = "Mist"
                extraClasses += " fog"
            } else if (weatherID === 711) {
                // Smoke
                weatherDescription = "Smoke"
                extraClasses += " smoke"
            } else if (weatherID === 721) {
                // Haze
                weatherDescription = "Haze"
                extraClasses += " fog"
            } else if (weatherID === 731) {
                // Dust
                weatherDescription = "Dust"
                extraClasses += " smoke"
            } else if (weatherID === 741) {
                // Fog
                weatherDescription = "Fog"
                extraClasses += " fog"
            } else if (weatherID === 751) {
                // Sand
                weatherDescription = "Sand"
                extraClasses += " smoke"
            } else if (weatherID === 761) {
                // Dust
                weatherDescription = "Dust"
                extraClasses += " smoke"
            } else if (weatherID === 762) {
                // Volcanic Ash
                weatherDescription = "Volcanic Ash"
                extraClasses += " smoke"
            } else if (weatherID === 771) {
                // Squall
                weatherDescription = "Squall"
                extraClasses += " wind"
            } else if (weatherID === 781) {
                // Tornado
                weatherDescription = "Tornado"
                extraClasses += " wind"
            } else if (weatherID === 800) {
                // Clear
                weatherDescription = "Clear"
                extraClasses += " clear"
            } else if (weatherID === 801) {
                // Clear
            weatherDescription = "Some Clouds"
                extraClasses += " cloudy"
            } else if (weatherID === 802) {
                // Clear
                weatherDescription = "Scattered Clouds"
                extraClasses += " cloudy"
            } else if (weatherID === 803) {
                // Clear
                weatherDescription = "Broken Clouds"
                extraClasses += " cloudy"
            } else if (weatherID === 804) {
                // Clouds
                weatherDescription = "Overcast"
                extraClasses += " cloudy"
            }

            // Pick icon
            iconURL = "http://openweathermap.org/img/wn/" + this.state.weather.weather[0].icon + "@4x.png"
        }
        return (
            <div>
                <Card>
                    <Card.Header>
                        <div className="date">Updated: {this.state.lastUpdated}</div>
                        Weather
                    </Card.Header>
                    <Card.Body className={"WeatherCard" + extraClasses}>
                        <Card.Text as="div">
                            {typeof this.state.weather.main != "undefined" ? (
                                <div>
                                    <div className="weather-container">
                                        <div className="temperature">{Math.round(this.state.weather.main.temp)}°F</div>
                                        <div className="weather"><img alt="{weatherDescription}" src={iconURL} /><br />{weatherDescription}</div>
                                    </div>
                                </div>
                            ) : (
                                    ""
                                )}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

function dateDisplay() {
    var d = new Date()
    var hours = d.getHours()
    var minutes = d.getMinutes()
    var seconds = d.getSeconds()
    var text = "AM"
    if (hours > 12) { hours = hours - 12; text = "PM" }

    // Pad minutes and hours with zeros
    if (minutes < 10) { minutes = "0" + minutes }
    if (seconds < 10) { seconds = "0" + seconds }

    return hours + ":" + minutes + ":" + seconds + " " + text
}

export default WeatherCard;