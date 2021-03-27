const request = require('request')

const forecast = (latitude, longtitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8fd8d422eecb6841248d8f14878cad52&query='+ encodeURIComponent(latitude) + ', ' + encodeURIComponent(longtitude) + '&units=m'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to the services', undefined)
        } else if(body.error){
            callback('Unable to find the location', undefined)
        }else {
            const current = body.current
            callback(undefined, `${current.weather_descriptions[0]}. It is currently ${current.temperature} degrees out. It feelslike ${current.feelslike} degrees out. Humidity level is ${current.humidity}`)
        }    
    })
}

module.exports = forecast