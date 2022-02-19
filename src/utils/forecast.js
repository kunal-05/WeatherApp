import request from 'request'
export const forecast = (latitude, longitude, callback)=>{
    const weather_url = 'https://api.darksky.net/forecast/af2fb396aa4bbc50e48067f6242d5022/'+latitude+','+longitude+'?units=si'
    request({url:weather_url, json: true}, (error, {body})=>{
    if (error){
        callback(undefined, "Weather api service not available!!",)
    }
    else if(body.error){
        callback(undefined, "Please provide proper name. Not able to fetch any results")
    }
    else{
        callback(undefined,body.daily.data[0].summary+' It is currently '+ body.currently.temperature+' degrees out. There is a '+ body.currently.precipProbability+'% chance of rain.')
    }

})
}
