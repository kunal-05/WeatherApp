import request from 'request'
export const geocode = (location, callback)=>{
    const geo_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(location) +'.json?access_token=pk.eyJ1IjoidmlzaG5pLXNvYnRpIiwiYSI6ImNrNHZvc3hkMjBvdWgza24xcHk4Njd5am8ifQ.qs8z03SBiK7lLHD6WM7ExA&limit=1'
    request({url:geo_url, json: true}, (error, {body})=>{
        if(error){
            callback(undefined, 'Geo position api is currently unavailable!')
        }
        else if(body.features.length===0 || body.message==='Not Found'){
            callback(undefined,"Please provide a proper name. No such place found!",)
        }
        else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
            })
        }
    })
}

