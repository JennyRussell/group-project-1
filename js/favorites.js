let favorites = [];
let faveIndex = 0;
let timer;

let favoriteHtml;

// clicking on one of the favorite items takes you to the Details page
function updateFavoriteListItem(favorite) {

    $("#favorite-container").attr("id", favorite.id);
    $(`#${favorite.id}`).click("container", function() {
        if (IS_PROD) {
            window.location.href = `/Hangry/details.html?businessId=${favorite.id}`;
        } else {
            window.location.href = `/details.html?businessId=${favorite.id}`;
        }

    });

    // data from API is injected into DOM elements on details page
    $("#business-image").attr("src", favorite.img_url);
    $("#business-image").attr("id", "business-image" + faveIndex);
    $("#displayPhone").text(favorite.phone);
    $("#displayPhone").attr("id", "displayPhone" + faveIndex);

    $("#business").text(favorite.name);
    $("#business").attr("id", "business" + faveIndex);

    $("#rating").text(favorite.rating);
    $("#rating").attr("id", "rating" + faveIndex);
    appendStarRating(favorite.rating)
    let ratingEl = $("#rating" + faveIndex)
    appendStarRating(favorite.rating, ratingEl);
    faveIndex++;
}
//retrieves favorites from local storage
function loadFavoritesFromLocalStorage() {
    favorites = getFromLocalStorage("favorites");
}


// function to load everything on the favorites page
function loadFavoritesPage() {
    loadNavBar();
    updateNavBar();
    loadFavoritesFromLocalStorage();
    addFavoriteToFavoritesList();
}

function addFavoriteToFavoritesList() {
    $.ajax({
        type: 'GET',
        url: "views/favorite.html",
        dataType: 'html',
        success: function(html) {
            favoriteHtml = html;
        }
    }).then(html => {

        favorites.forEach(fave => {
            $("#faveList").append(html);
            updateFavoriteListItem(fave);
        })

    });
}

$(document).ready(function() {
    loadFavoritesPage();
});