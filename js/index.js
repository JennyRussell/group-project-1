let currentIndex = 0;
let favoritesArray = [];
var businesses = [];

const businessTitleEl = document.getElementById("business");
const businessPhoneEl = document.getElementById("displayPhone");
const businessImageEl = document.getElementById("business-image");
const businessdistanceEl = document.getElementById("distance");

const nextButtonEl = document.getElementById("next-button");
const favoriteButtonEl = document.getElementById("favorite-button");

//this function runs through each if the resturaunts when the next or favorite button is clicked
function loadRest(response) {
    businesses = response.businesses;
    //moved index logic to 0 here, as the response json returns a list response. This can be manipulated in the callback for your specific UI.
    updateBusinessInformation(businesses);

    //this is an event lsitener for the favorite button
    favoriteButtonEl.addEventListener("click", function() {
        console.log(businesses[currentIndex]);
        const businessId = businesses[currentIndex].id;
        favoritesArray.push(businessId);

        saveToLocalStorage('favorites', favoritesArray);
        currentIndex++;
        //will load the next item from the list array
        loadRest(response)
    });

    //this is an event lsitener for the next button
    nextButtonEl.addEventListener("click", function() {
        currentIndex++;
        //will load the next item from the list array
        loadRest(response)
    })
}

function updateBusinessInformation(businesses) {
    businessdistanceEl.textContent =
        (businesses[currentIndex].distance * 0.00062137119).toFixed(1) + "mi";
    businessTitleEl.textContent = businesses[currentIndex].name;
    businessPhoneEl.textContent = businesses[currentIndex].display_phone;
    businessImageEl.src = businesses[currentIndex].image_url;
}


function errorFunction(err) {
    console.log("say hello");
}

function indexSuccessCallback(latLon) {
    console.log("we have an geolocator!asdasds")
    console.log(latLon);
    // console.log("the current postion is", position.cords.latitude)
    // const lat = position.coords.latitude;
    // const long = position.coords.longitude;

    $("#long").text(latLon.lon);
    $("#lat").text(latLon.lat);
    getBusinessByLatLon(latLon.lat, latLon.lon, loadRest);
}

// This is the entry point for the entire application.
$(document).ready(function() {
    console.log("hey, we are at the starting point of our app")
    getLocation(indexSuccessCallback, errorFunction);
});