let url = 'https://api.wheretheiss.at/v1/satellites/25544'

let isslat = document.querySelector('#iss-lat')
let isslong =document.querySelector('#iss-long')
let timeLocation = document.querySelector('#time')

let update= 1
let issMarker
let icon = L.icon({
    iconUrl: 'iss_icon.png',
    iconSize: [50,50],
    iconAnchor: [25,25]

})

let map = L.map('iss-map').setView([0,0] , 1)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

iss()
setInterval(iss, update)

function iss() {
    fetch(url).then((res) => {
        return res.json()

    }).then((issDATE) => {
        console.log(issDATE)
        let lat = issDATE.latitude
        let long = issDATE.longitude

        isslat.innerHTML = lat
        isslong.innerHTML = long

        if(! issMarker){
            issMarker= L.marker([lat, long],{icon: icon}).addTo(map)
        }else {
            issMarker.setLatLng([lat, long])
        }
        let now = Date()
        timeLocation.innerHTML = `This date was fetched at ${now}`

    }).catch((err) => {
        console.log('ERROR!', err)

    })




}


