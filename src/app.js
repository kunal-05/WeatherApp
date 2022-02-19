import express from 'express'
import { dirname } from 'path';
import path from'path';
import { fileURLToPath } from 'url';
import hbs from 'hbs'
import {geocode} from './utils/geocode.js'
import {forecast} from './utils/forecast.js'
const app = express()
//for ES6 format
const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDirectoryPath = path.join(__dirname, '../public')
const viewpath = path.join(__dirname, '../templates/views')
const partialpath = path.join(__dirname, '../templates/partials' )

// set up handlebar engines and view location
app.set('view engine', 'hbs')
app.set('views', viewpath )
hbs.registerPartials(partialpath)

app.use(express.static(publicDirectoryPath))


app.get('', (req,res)=>{
    res.render('index')
})

app.get('/help',(req,res)=>{
    res.render('help')
})

app.get('/about',(req,res)=>{
    res.render('about')
})

app.get('/weather', (req,res) => {
    if (!req.query.location){
        return res.send({
            error:'You must provide a location!!'
            })
    }

    geocode(req.query.location,(error, {latitude, longitude, location})=>{
        if (error)
        {   
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecast_data)=>{
            if (error)
            {
                return res.send({error})
            }
            res.send({
                location,
                forecast_data

        })
        })
    })
})

app.get('*',(req,res)=>{
    res.render('404')
})

app.listen(3000,()=>{
    console.log("Server is up!!!")
})