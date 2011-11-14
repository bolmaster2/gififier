# Gififier
It magically "gifify" your images into an animation. Just like a classic gif! How cool is that?

``` html
<ul id="image-list">
  <li><img src="img/example-frames/1.jpg" alt="" /></li>
  <li><img src="img/example-frames/2.jpg" alt="" /></li>
  <li><img src="img/example-frames/3.jpg" alt="" /></li>
</ul>
```

and then include the js and run it:

``` html
<script src="gififier.js"></script>
<script>
  // Create the gififier object
  var g = new Gififier({
    el: document.getElementById("image-list"),
    speed: 200 // optional, defaults to 400
  });
  
  // ... and play it on body load
  window.onload = function() {
    g.play();
  };
  
</script>
```