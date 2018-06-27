
// initial array

var foodArray = ["steak", "sausages", "potatoes", "pork chops", "ribs", "pulled pork", "lamb chops", "fried rice", "chicken soup", "sushi", "sashimi", "dumplings", "souvlaki", "noodles", "pasta", "schnitzel"];

// grab value in the form from the submit button click event and push it to the existing food array
// empty the div first, then display the new button with the rest of the food items

function renderButtons () {

    $("#foodButtons").empty();

    for (i = 0; i < foodArray.length; i++) {
        var foodButton = $("<button>");
        foodButton.addClass("food");
        foodButton.attr("data-name", foodArray[i]);
        foodButton.text(foodArray[i]);
        $("#foodButtons").append(foodButton);
    }
}


// click handler for new foods
$("#addFood").on("click", function(event) {


        event.preventDefault();

        var newFood = [$("#foodInput").val().trim()];

        foodArray.push(newFood);

        $("#foodInput").val("");
        renderButtons();
  });

renderButtons();


// grab value in button pushed and plug it into the API link, 
// attaching the starting and stopping of animation to the image divs

$(document).on("click", ".food", displayFoodGifs);

function displayFoodGifs() {

var foodValue = $(this).attr("data-name");

var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=iOblijBujHPcUX3TsWALVRGZGDm4LZyp&q=" + foodValue + "&limit=10";


$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    // response yielded an array of objects called data, which includes more nested objects and arrays
    // must loop through the array and it's objects to grab info




    for (var i = 0; i < response.data.length; i++) {

        var foodDiv = $("<div>");
        foodDiv.addClass("gif-group");

        // get the still and animate gif urls

        var stillFoodUrl = response.data[i].images.fixed_height_still.url;
        var animateFoodUrl = response.data[i].images.fixed_height.url;
        
        // get rating, turns out some ratings don't exist
        var rating = response.data[i].rating;

            if (rating === "") {
                rating = "none";
            }

        // generate html for the retrieved data


        var gifRating = $("<p>");
        gifRating.text("Rating: " + rating);

        var image = $("<img>");
        image.attr("src", stillFoodUrl);
        image.attr("data-still", stillFoodUrl);
        image.attr("data-animate", animateFoodUrl);
        image.attr("data-state", "still");
        image.addClass("gif");

        foodDiv.append(gifRating, image);

        $("#foodGifs").prepend(foodDiv);
    }



  });

};

$(document).on("click", ".gif", function() {

    var state = $(this).attr("data-state");
    console.log(state);

    if (state === "still") {
        var animate = $(this).attr("data-animate");
        $(this).attr("src", animate);
        $(this).attr("data-state", "animate");
      } else {
        var still = $(this).attr("data-still");
        $(this).attr("src", still);
        $(this).attr("data-state", "still");
      }

});