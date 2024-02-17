"use strict"

// global variables
var gl;
var points;
let x = 0.0; 
let y = 0.0; 
let xLoc, yLoc;
let xDir = 1.0; 
let yDir = 1.0; 
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
    vec2(-.25, -.25),
    vec2(0, .25),
    vec2(.25, -.25)
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
  setTimeout( function(){
    requestAnimationFrame(render);

    
      x += 0.05 * xDir; 
      y += 0.01 * yDir;

      gl.uniform1f(xLoc, x); 
      gl.uniform1f(yLoc, y); 

      gl.clear(gl.COLOR_BUFFER_BIT);
      
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      delay(3000);
      window.requestAnimationFrame(render); 
    }, 100);
}