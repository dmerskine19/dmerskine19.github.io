"use strict"

// global variables
var gl;
var theta = 0.0;
var thetaLoc;

window.onload = function init() {

  // Grab the canvas object and initialize it
  var canvas = document.getElementById('gl-canvas');
  gl = WebGLUtils.setupWebGL(canvas);

  if (!gl) { alert('WebGL unavailable'); }
  
  //
  // configure WebGL
  //
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1.0, 1.0, 1.0, 1.0);

  //
  // load shaders and initialize attribute buffers
  //
  var program = initShaders(gl, 'vertex-shader', 'fragment-shader');
  gl.useProgram(program);


  var vertices = [
    vec2(-.25, -.25),
    vec2(0, .25),
    vec2(.25, -.25)
  ];

  //
  // load data into GPU
  //
  var bufferID = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferID);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

  // Associate out shader variables with our data buffer
  var vPosition = gl.getAttribLocation(program, 'vPosition');
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);

  thetaLoc = gl.getUniformLocation( program, "theta" );

  render();
};

// Render whatever is in our gl variable
function render() {

  gl.clear(gl.COLOR_BUFFER_BIT);

  theta += .1;

  gl.uniform1f(thetaLoc, theta);

  gl.drawArrays(gl.TRIANGLES, 0, 3);

  window.requestAnimationFrame(render); 
}
