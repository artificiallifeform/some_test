const vertexShaderSrc = `#version 300 es

layout(location = 0) in vec4 aPosition;
layout(location = 1) in vec2 vTexCoords;


out vec2 aTexCoords;

void main() {
    gl_Position = aPosition;
    aTexCoords = vTexCoords;
}`;

const fragmentShaderSrc = `#version 300 es
precision mediump float;

out vec4 fragColor;

in vec2 aTexCoords;

uniform sampler2D uSampler;

void main() {
    fragColor = texture(uSampler, vec2(aTexCoords.x, -aTexCoords.y));
}
`
const canvas = document.querySelector("canvas");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

const gl = canvas.getContext("webgl2");


const program = gl.createProgram();

{
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSrc);
    gl.compileShader(vertexShader);
    gl.attachShader(program, vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSrc);
    gl.compileShader(fragmentShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.log(gl.getShaderInfoLog(vertexShader));
        console.log(gl.getShaderInfoLog(fragmentShader));
    }
}

gl.useProgram(program);


const loadImage = () => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener("load", () => resolve(image));
        // image.src = canvasImage.toDataURL();
        image.src = "assets/red_atlas.png";
    })
}

let mult1 = 1;
let mult2 = 2;

const vertecies = new Float32Array([
    -0.5,       0.0,         0.09645577871007217 + 0.09645577871007217, 0,
    -0.5,       0.28,        0.09645577871007217 + 0.09645577871007217, 1,
    -0.2474,    0.28,        0.09645577871007217, 1,
    -0.2474,    0.0,        0.09645577871007217, 0
])

const indecies = new Uint16Array([
    0, 1, 2,
    0, 3, 2
])


const run = async () => {
    const m = await loadImage();
    
    
    const vertexDataBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexDataBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertecies, gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 4*4, 0);
    gl.enableVertexAttribArray(0);


    gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 4*4, 4*2);
    gl.enableVertexAttribArray(1);
    
    const indeciesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indeciesBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indecies, gl.STATIC_DRAW);
    
    const texture2 = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture2);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 950, 160, 0, gl.RGB, gl.UNSIGNED_BYTE, m);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);


    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, indeciesBuffer);
}

run();