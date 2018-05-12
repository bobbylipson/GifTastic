$(document).ready(function(){
    // Array of animals
    var animals = ["cat", "dog", "sloth", "hamster", "orangutan", "tiger", "sea lion", "meerkat", "elephant", "pig", "panda", "penguin", "owl", "bear", "frog", "monkey", "rabbit", "llama", "goose"];
    // Function that displays all gif buttons
    function displayGifButtons(){
        $("#gifButtonsView").empty();
        for (var i = 0; i < animals.length; i++){
            var gifButton = $("<button>");
            gifButton.addClass("animal");
            gifButton.addClass("btn btn-primary");
            gifButton.attr("data-name", animals[i]);
            gifButton.text(animals[i]);
            $("#gifButtonsView").append(gifButton);
        }
    }
    // Function to add new button
    function addNewButton(){
        $("#addGif").on("click",function(){
            var animal = $("#animal-input").val().trim();
            if (animal == ""){
                return false;
            }
            animals.push(animal);


            displayGifButtons();
            return false;
        });
    }
    // Function to remove last action button
    
    
    function removeLastButton(){
        $("removeGif").on("click", function(){
            animals.pop(animal);
            displayGifButtons();
            return false;
        });
    }
    // Function that displays all of the gifs
    function displayGifs(){
        var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=N5ICuWQWixgZHXfNRHCgqp3Xpbn7XLXP&q=" + animal + "&limit=10&offset=0&rating=R&lang=en";
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response){
            $("#gifsView").empty();
            var results = response.data;
            if(results == ""){
                alert("There isn't a gif for this selected button");
            }
            for (var i = 0; i < results.length; i++){

                //div for the gifs to go inside
                var gifDiv = $("<div>");
                gifDiv.addClass("gifDiv");
                // Pulling rating of gif
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.append(gifRating);
                // Pulling gif
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url);
                gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
                gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
                gifImage.attr("data-state", "still");
                gifImage.addClass("image");
                gifDiv.append(gifImage);


                $("#gifsView").prepend(gifDiv);
            }
        });
    }
    // Calling functions and methods
    displayGifButtons();
    addNewButton();
    removeLastButton();
    // Document event listeners
    $(document).on("click", ".animal", displayGifs);
    $(document).on("click", ".image", function(){
        var state = $(this).attr('data-state');
        if (state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
});