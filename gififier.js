// Gififier "gifify" your images from a html list!
function Gififier(params) {
  var self = this;
  
  // The current frame index
  this.current_frame = 0;
  
  // Timer
  this.timer = (new Date).getTime();

  // The frames
  this.frames = [];
  
  // Is it playing?
  this.playing = false;
  
  // The DOM element
  this.el = params.el;
  
  // Default options
  this.options = {
    speed: 400
  }

  // Override default options
  for (var k in params) {
    this.options[k] = params[k];
  }
  
  // Get the frames from the DOM
  this.get_frames();
  
  // hide all frames
  this.hide_frames();
  
  // Show the current frame
  this.show_current_frame();
  
};

// PRIVATE

// Get LI elements from this.el
Gififier.prototype.get_frames = function() {
  return this.frames = this.el.getElementsByTagName("li");
};

// Hide all frames
// Loop through this.frames and set display none on the images
Gififier.prototype.hide_frames = function() {
  for (var k in this.frames) {
    var v = this.frames[k];
    
    if (typeof v != "object") return;

    v.style.display = "none";
  }
};

// Show current frame
Gififier.prototype.show_current_frame = function() {
  this.frames[this.current_frame].style.display = "block";
};

// Setup the interval with request animation frame
Gififier.prototype.setup_interval = function() {
  // Reference to object
  var self = this;

  // Animation loop function
  (function animloop() {
    // If it's not playing - don't go any further
    if (!self.playing)
      return false;
      
    // Call the animloop with the cross-browser requestAnimFrame
    requestAnimFrame(animloop, self.el, self.options.speed);
    
    // Is it time to go to the next frame? 
    // (is the current time bigger than when we where here last time plus the speed)
    if ((new Date).getTime() > (self.timer + self.options.speed)) {
      // update the timer with the current time
      self.timer = (new Date).getTime();
      // go to next frame!
      self.next_frame();
    }    
  })();
};

// Go to the next frame
Gififier.prototype.next_frame = function() {
  this.current_frame++;
  if (this.current_frame >= this.frames.length) {
    this.current_frame = 0;
  }
  this.hide_frames();
  this.show_current_frame();
};

// PUBLIC API

// Play
Gififier.prototype.play = function() {
  this.playing = true;
  this.setup_interval();
};

// Pause
Gififier.prototype.pause = function() {
  // Toggle play/pause
  if (!this.playing) {
    this.play();
    return;
  }
  this.playing = false;
};   

// Stop - pause and go to first frame
Gififier.prototype.stop = function() {
  this.pause();
  this.reset();
};

// Go to first frame
Gififier.prototype.reset = function() {
  this.current_frame = 0;
};

// Paul Irish requestAnimFrame - http://paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function(){
return  window.requestAnimationFrame       || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame     || 
        function(callback, element, speed) {
          window.setTimeout(callback, speed);
        };
})();