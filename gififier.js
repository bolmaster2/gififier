function Gififier(params) {
  var self = this;
  // The current frame index
  this.current_frame = 0;
  
  this.timer = (new Date).getTime();

  
  // The frames
  this.frames = [];
  
  // this.interval = null;
  this.playing = false;
          
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

Gififier.prototype.get_frames = function() {
  return this.frames = this.el.getElementsByTagName("li");
};

Gififier.prototype.hide_frames = function() {
  for (var k in this.frames) {
    var v = this.frames[k];
    
    if (typeof v != "object") return;

    v.style.display = "none";
  }
};

Gififier.prototype.show_current_frame = function() {
  this.frames[this.current_frame].style.display = "block";
};

Gififier.prototype.setup_interval = function() {
  var self = this;

  (function animloop() {
    if (!self.playing)
      return false;
      
      requestAnimFrame(animloop, self.el, self.options.speed);
    
    if ((new Date).getTime() > (self.timer + self.options.speed)) {
      self.timer = (new Date).getTime();
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

Gififier.prototype.previous_frame = function() {
  
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