console.log("Client side javascript is loaded")

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    const location = searchElement.value

    if(searchElement.value === ''){
        messageOne.textContent = 'Please enter a location'
        messageTwo.textContent = ''
    }
    else{
        fetch("http://localhost:3000/weather?adress=" + location).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error
                }
                else{
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecastData
                }
            })
        })
    }
    searchElement.value = ''
})