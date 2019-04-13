var topics = [
    "Dallas Mavericks", "Dallas Cowboys","Dallas Stars", "Dirk Nowitzki", "Dak Prescott",
    "Houston Rockets", "Houston Astros",
    "Texas Rangers", "Rougned Odor",
    "Kansas City Cheifs",
    "Los Angeles Lakers", "Los Angeles Rams", "Kobe Bryant",
    "Milwaukee Bucks", "Milwaukee Brewers", "Giannis Antetokounmpo"
];



$( document ).ready(function() {
    
    function addButtons(){
        $("#buttons").empty();
        for (var x=0; x<topics.length; x++) {
        
            var newButton = $("<button>");
            newButton.addClass("giphy-button btn btn-primary");
            newButton.attr("data-topic", topics[x]);
            newButton.text(topics[x]);
            $("#buttons").append(newButton);
        };
    };
    
    addButtons();
    
    $("#buttons").on("click", ".giphy-button", function() {

        var myTopic = $(this).attr("data-topic");
        console.log(myTopic);
        $("#gif-area").empty();

        var xhr = $.get("http://api.giphy.com/v1/gifs/search?q="+myTopic+"&api_key=fFhfIcSoeSiCajP1e9Qk1Ooy6lkEM5CS&limit=10");
        xhr.done(function(res) { 
            console.log(res); 
            for (var x=0; x<res.data.length;x++) {
                var newGiph = $("<div>");
                newGiph.addClass("still-giph");
                
                newGiph.html("<img src="+res.data[x].images.fixed_height_still.url+" class='img-fluid rounded'>");
                newGiph.attr("data-topic", myTopic);
                newGiph.attr("id", "giph-"+x);
                var myRating = $("<div>");
                myRating.addClass("rating");
                myRating.text("Rating: "+res.data[x].rating.toUpperCase());
                newGiph.append(myRating);
                $("#gif-area").append(newGiph);
                
            };
            
        });
    });

    $('#gif-area').on('click', '.still-giph', function() {
        var myTopic = $(this).attr("data-topic");
        var myID = $(this).attr("id");
        
        var xhr = $.get("http://api.giphy.com/v1/gifs/search?q="+myTopic+"&api_key=fFhfIcSoeSiCajP1e9Qk1Ooy6lkEM5CS&limit=10");
        xhr.done(function(res) { 
            var myIDnum = myID.charAt(5);
            var myRating = $("<div>");
            myRating.addClass("rating");
            myRating.text("Rating: "+res.data[myIDnum].rating.toUpperCase());
            

            if ($("#"+myID).html().includes("_s")) {
                $("#"+myID).html("<img src="+res.data[myIDnum].images.fixed_height.url+" class='img-fluid rounded'>");
                $("#"+myID).append(myRating);
            } else {
                $("#"+myID).html("<img src="+res.data[myIDnum].images.fixed_height_still.url+" class='img-fluid rounded'>");
                $("#"+myID).append(myRating);
            }
                        
        });
        
    });

    $("#add-topic").on("click", function(event) {
        event.preventDefault();
  
        var newTopic = $("#topic-input").val().trim();
        topics.push(newTopic);
        $("#topic-input").val("");
        addButtons();
    });

    
});

