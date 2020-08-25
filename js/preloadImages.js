//Preload Images
var images = new Array();

function preloadImages(){

    for (i=0; i < preloadImages.arguments.length; i++){

         images[i] = new Image();

        images[i].src = preloadImages.arguments[i];

    }

}

preloadImages("https://i.imgur.com/sgSXRRJ.png", "https://i.imgur.com/UhDGoUq.png");
// End Preload Images
