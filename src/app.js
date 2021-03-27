const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast');

console.log(__dirname)
console.log(path.join(__dirname, '../public'));

const app = express()

//paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//setup handle bars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//setup static directory
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Dogu Senturk"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About me",
        name: "Dogu Senturk"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: "This is the help page",
        name: "Dogu Senturk",
        title:"Help"
    })
})

app.get('', (req, res) => {
    res.send("<h1>Weather</h1>")
})

app.get('/weather', (req, res) => {
    if(!req.query.adress){
        return res.send({
            error: "Please enter a value for adress"
        })
    }
    geocode(req.query.adress, (error, {latitude, longtitude, location} = {}) => {

        if (error) {
            return res.send({
                error: "Unable to find the location"
            })
        }

        forecast(latitude, longtitude, (error, forecastData) => {
            if (error) {
                console.log(error)
            }
            res.send({
                location: location,
                forecastData: forecastData,
                adress: req.query.adress
            })
        })
    })
    // res.send({
    //     forecast: "It is snowing",
    //     location: "Philadelphia",
    //     adress: req.query.adress
    // })
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404",
        errorMessage: "Error 404, An error occured",
        name: "Dogu Senturk"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        errorMessage: "Error 404, An error occured",
        name: "Dogu Senturk"
    })
})

app.listen(3000, () => {
    console.log("Server is up on port 3000")
})