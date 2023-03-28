import { mat4 } from "gl-matrix";

import Grid from "./elements/Grid";

const vertexShaderSource = `#version 300 es

layout(location = 0) in vec2 aPosition;

uniform mat4 uModel;
uniform mat4 uProjection;
uniform mat4 uView;


void main()
{
  gl_Position = uProjection * uView  * uModel * vec4(aPosition, 0.0, 1.0);
}`


const fragmentShaderSource = `#version 300 es

precision mediump float;

out vec4 outColor;
void main()
{
  outColor = vec4(0.2078, 0.60784, 0.71372, 1.0);
}
`

const canvas = document.querySelector("canvas");

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

const gl = canvas.getContext("webgl2", {antialias: false});


const program = gl.createProgram();



const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexShaderSource);
gl.compileShader(vertexShader);
gl.attachShader(program, vertexShader);

gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentShaderSource);
gl.compileShader(fragmentShader);
gl.attachShader(program, fragmentShader);

gl.linkProgram(program);

gl.useProgram(program);

const vertexDataBuffer = gl.createBuffer();



// const data = new Float32Array([
//   0.0, 0.0,
//   0.0, 0.5,

//   0.2 , 0.0,
//   0.2, 0.5,

//   0.0, 0.0,
//   0.4, 0.0,

//   0.0, 0.2,
//   0.4, 0.2
// ])

const data = new Float32Array([
    0.0, 0.0, 0.0,
    0.0, 0.7, 0.0,
    0.7, 0.0, 0.0
])  




const modelLoc = gl.getUniformLocation(program, "uModel");
const viewLoc = gl.getUniformLocation(program, "uView");
const projectionLoc = gl.getUniformLocation(program, "uProjection");


const model = mat4.create();
const view = mat4.create();
const projection = mat4.create();


const rotationM = mat4.create();

mat4.rotateZ(rotationM, rotationM, Math.PI / 2);


// mat4.scale(rotationM, rotationM, [0.01, 1, 1]);
console.log(rotationM);

// mat4.rotateZ(model, model, 1);

mat4.lookAt(view, [0,0,0.5], [0,0,0], [0,1,0])

const resol = gl.canvas.width / gl.canvas.height;

mat4.ortho(projection, -2,2, -2/resol,2/resol, 0.001,100);


// mat4.translate(model, model, [1.0, 0.4, 0.0]);

console.log(model);


// gl.uniformMatrix4fv(modelLoc, false, model);
gl.uniformMatrix4fv(viewLoc, false, view);
gl.uniformMatrix4fv(projectionLoc, false, projection);


gl.clearColor(0.0, 0.0, 0.0, 1.0);
  // Clear the context with the newly set color. This is
  // the function call that actually does the drawing.
gl.clear(gl.COLOR_BUFFER_BIT);


const grid = new Grid(null, 0.05, 0.2);

grid.draw_on_scene(gl, vertexDataBuffer, program)


// gl.bindBuffer(gl.ARRAY_BUFFER, vertexDataBuffer);
// gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);


// gl.enableVertexAttribArray(0);
// gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 12, 0);
// gl.drawArrays(gl.TRIANGLES, 0, 3);



// const draw = () => {
//   requestAnimationFrame(draw);


//   // mat4.rotateX(model, model, 0.01);

//   mat4.rotateZ(projection, projection, 0.01);
//   gl.uniformMatrix4fv(projectionLoc, false, projection);

//   gl.uniformMatrix4fv(modelLoc, false, model);
//   gl.drawArrays(gl.LINES, 0, 8);
// }

// draw()