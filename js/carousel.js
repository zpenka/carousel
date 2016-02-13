$(function() {
  // Definitions
  var current = 0; // main variable for image manipulation
  var next; // create scope for next reference
  var leftButton = $('#left a');
  var rightButton = $('#right a');
  var slides = $('#frame img'); // jQuery collection of all carousel images
  var bubbles = $('#wrapper div.bubble'); // jQuery collection of all navigation bubbles
  var prevThumb = $('#prev');
  var nextThumb = $('#next');
  var count = slides.length - 1; // create reference to number of slides
  var interval; // create scope for the carousel interval

  // Fade in the first image and begin carousel
  $(slides[0]).fadeIn(300, runCarousel());

  // Button functionality
  leftButton.click(function() {
    showSlide(current - 1);
  });

  rightButton.click(function() {
    showSlide(current + 1);
  });

  // Button hover functionality
  leftButton.hover(function() { // show preview pane
    prevThumb.show("fast", function() {
      // add image
      prevThumb.css('background', function() {
        // get previous slide
        var previous = current - 1;

        if (previous < 0) { // adjust if hovering while over the first slide
          previous = slides.length - 1;
        }

        // return the url for the previous slide
        var link = $(slides[previous]).attr( 'src' );
        return "url('" + link + "')";
      });

      // set the background-size
      prevThumb.css('background-size', 'cover');
    })
  }, function() { // hide pane when not hovering
      prevThumb.hide("fast"); // remove image
    }
  );

  rightButton.hover(function() { //show preview pane
    nextThumb.show("fast", function() {
      // add image
      nextThumb.css('background', function() {
        // get next slide
        if (next > slides.length - 1) {
          next = 0;
        }

        // return url for the next slide
        var link = $(slides[next]).attr( 'src' );
        return "url('" + link + "')";
      });

      // set the background size
      nextThumb.css('background-size', 'cover');
    })
  }, function() { // hide pane when not hovering
      nextThumb.hide("fast"); // remove image
    }
  );

  // Bubbles functionality
  $('body').on("click", ".bubble", function() {
    // remove selected class from all bubbles
    $(bubbles).removeClass('selected');

    // make the clicked bubble selected
    $(this).addClass('selected');

    // show the corresponding image
    showSlide($(bubbles).index($(this)));
  });

  // Function definitions
  function runCarousel() { // This function is used to run the carousel
    // set next as it relates to current
    next = current + 1;

    // set an interval which changes the slide every 5 seconds
    interval = setInterval(function() {
      // create an endless rotation of slides
      if (next > count) {
        next = 0;
      }

      // color appropriate bubble
      $(bubbles).removeClass('selected'); // remove class selected from all bubbles
      $(bubbles[next]).addClass('selected'); // make the current image's bubble selected

      // fade out current slide
      $(slides[current]).fadeOut(300);

      // fade in next slide
      $(slides[next]).fadeIn(300);

      // update current and next slides
      current = next;
      next++;
    }, 5000);
  }

  function showSlide(slide) { // Show the currently selected slide
    window.clearInterval(interval); // Temporarily stop the carousel

    $(slides[current]).fadeOut(300); // fade out the current slide

    // make the new slide the current one
    current = slide;

    // ensure carousel doesn't go out of range
    if (current > slides.length - 1) {
      current = 0;
    } else if (current < 0) {
      current = slides.length - 1;
    }

    // fade in next slide
    $(slides[current]).fadeIn(300);

    // fill appropriate bubble
    $(bubbles).removeClass('selected');
    $(bubbles[current]).addClass('selected');

    // resume carousel
    runCarousel();
  }
});
