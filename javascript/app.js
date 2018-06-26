
var foodArray = ["steak", "sausages", "potatoes", "pork chops", "ribs", "pulled pork", "lamb chops",
"fried rice", "chicken soup", "sushi", "sashimi", "dumplings", "souvlaki", "noodles", "pasta", "schnitzel"]

// grab value in the form from the submit button event and push it to the existing food array
// display the new button


// grab value in button pushed and plug it into the API link, 
// attaching the starting and stopping of animation to the image divs


var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=iOblijBujHPcUX3TsWALVRGZGDm4LZyp&q=" + buttonValue + "&limit=10&offset=0&rating=PG-13&lang=en";


$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(buttonValue) {
    console.log(buttonValue);
  });