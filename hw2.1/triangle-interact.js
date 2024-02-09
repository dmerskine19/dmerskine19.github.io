"use strict"

// global variables
var gl;
var points;
let x = 0.0; 
let y = 0.0; 
let xLoc, yLoc;
let dirs = [null, null];  // horizontal, vertical  

window.onload = function init() {

    window.addEventListener("keydown", function(e){ 
      if (e.key == 'a'){
        dirs[0] = false; 
      }

      else if (e.key == 'd'){
       dirs[0] = true; 
      }

      else if (e.key == 'w'){
        dirs[1] = true; 
      }

      else if (e.key == 's'){
        dirs[1] = false; 
      } 

      else if (e.key == ' '){
        dirs[0] = null;
        dirs[1] = null;
      }

      console.log("Key: " + e.key); 
    }, false 
  );

  // Grab the canvas object and initialize it
  var canvas = document.getElementById('gl-canvas');
  gl = WebGLUtils.setupWebGL(canvas);

  // Error checking
  if (!gl) { alert('WebGL unavailable'); }

  // triangle vertices
  var vertices = [
    vec2(-.1, -.1),
    vec2(0, .1),
    vec2(.1, -.1)
  ];

  // configure WebGL
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1.0, 1.0, 1.0, 1.0);

  // load shaders and initialize attribute buffers
  var program = initShaders(gl, 'vertex-shader', 'fragment-shader');
  gl.useProgram(program);

  // global variable links
  xLoc = gl.getUniformLocation(program, "x"); 
  yLoc = gl.getUniformLocation(program, "y"); 

  // load data into GPU
  var bufferID = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferID);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

  // set its position and render it
  var vPosition = gl.getAttribLocation(program, 'vPosition');
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);

  render();
};

// Render whatever is in our gl variable
function render() {

  gl.clear(gl.COLOR_BUFFER_BIT);

  if (dirs[0] === true) // move right 
    x += 0.005; 
  else if (dirs[0] === false) // move left 
      x -= 0.005; 


  if (dirs[1] === true) // move up 
    y += 0.005; 
  else if (dirs[1] === false) // move down  
    y -= 0.005;
    
  gl.uniform1f(xLoc, x); 
  gl.uniform1f(yLoc, y);  

  
  gl.drawArrays(gl.TRIANGLES, 0, 3);

  window.requestAnimationFrame(render); 
}
