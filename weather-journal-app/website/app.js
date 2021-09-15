let d = new Date();
var newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();
//***********************
//set the url and Api key 
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = 'e0bfdba6e59e1352a3b56a0ceebe673c';
document.getElementById('generate').addEventListener('click', performAction);
//function to make the information save and appear on the screen
function performAction(e) {
    const newzip = document.getElementById('zip').value;
    getTemperature(baseURL, newzip, apiKey);
}
const getTemperature = async(baseURL, zip, key) => {
    //Variable to compile, link and receive output
    //change the (us) in (us&appid) if you want another country 
    const res = await fetch(baseURL + zip + ",us&appid=" + key + "&units=metric");
    try {
        //to get the information
        const data = await res.json();
        const Temperature = data.main.temp;
        const feel = document.getElementById("feelings").value
        await fetch("/saveInformations", {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                date: newDate,
                feelings: feel,
                temp: Temperature
            })
        });
        //to set a the input to the div and print it on the screen
        const response1 = await fetch("/getInformations")
        const fdata = await response1.json();
        let ldate = document.getElementById("date");
        let ltemp = document.getElementById("temp");
        let lcontent = document.getElementById("content");
        ldate.textContent = `date: ${fdata.date}`;
        ltemp.textContent = "temp:" + fdata.temp;
        lcontent.textContent = "feel:" + fdata.feelings;
        //if any thing go wrong
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}
