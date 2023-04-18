function main(){
  $('.links-button').on('click', function() {
    $(this).next().slideToggle(1000);
    $(this).toggleClass('active');
});
};
$(document).ready(main);

var curIndex = 0;
    imgDuration = 10000;
    slider = document.getElementById("slider");
    slides = slider.childNodes; //get a hook on all child elements, this is live so anything we add will get listed
    imgArray = [
        'Marlow.jpg',
        'Warborrow.jpg'
        ];
    
// Dynamically add each slideshow image frame into the DOM;
function buildSlideShow(arr) {
    for (i = 0; i < arr.length; i++) {
        var img = document.createElement('img');
        img.src = arr[i];
        slider.appendChild(img);
    }
    // note the slides reference will now contain the images so we can access them
}

// Our slideshow function, we can call this and it flips the image instantly, once it is called it will roll
// our images at given interval [imgDuration];

function slideShow() {
    
    function fadeIn(e) {
        e.className = "fadeIn";
    };

    function fadeOut(e) {
        e.className = "";
    };

        fadeOut(slides[curIndex]);
        curIndex++;
        if (curIndex === slides.length) {
            curIndex = 0;
        }
        
        fadeIn(slides[curIndex]);

        setTimeout(function () {
            slideShow();
        }, imgDuration);
    };  //end of slideshow function

    buildSlideShow(imgArray);
    slideShow();
