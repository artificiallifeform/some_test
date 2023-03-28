const vertexShaderSrc = `#version 300 es

layout(location = 0) in vec4 aPosition;
layout(location = 1) in vec2 aTexCoord;

out vec2 vTexCoord;

void main() {
    vTexCoord = aTexCoord;
    gl_Position = aPosition;
}`;

const fragmentShaderSrc = `#version 300 es
precision mediump float;

in vec2 vTexCoord;
uniform sampler2D uSampler;

out vec4 fragColor;

void main() {
    fragColor = texture(uSampler, vec2(vTexCoord.x, -vTexCoord.y));
    // fragColor = vec4(1.0, 0.0, 0.0, 1.0);
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



const vertecies = new Float32Array([
    -1, 0.-0.7,
    0.0,  0.8,
    1, -0.7
]);

const texCoords = new Float32Array([
    0, 0,
    0.2, 0.2,
    0.2, 0
]);

const url64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAMxUlEQVR4Xu2deaxt1xzHX81ChFQUiTEqMVOzBIkSU2glZjW1QvkDFcMTYw2JIkrEkNCKWY0VtGKIJhrETEmQCA2NilAxq/H3vT237773zrD3b1h337U/K1npe++u32+f9fntT/e+5+yz1hH7aBCAwEoCR8AGAhBYTQBBODsgsIYAgnB6QABBOAcg4CPAFcTHjaiZEECQmRSaafoIIIiPG1EzIYAgMyk00/QRQBAfN6JmQgBBZlJopukjgCA+bkTNhACCzKTQTNNHAEF83IiaCQEEmUmhmaaPAIL4uBE1EwIIMpNCM00fAQTxcZtK1LH2Qr5oPaOOp1me/VOZ2FReRwbYqcxlbq/jWjbhC6zfOGniCLIEJIIknV27kObddsyTEo+LIAiSeDrtbqoH2+HPSX4JCIIgyafU7qS7th32x9ZvmHx4BEGQ5FNqd9K93w57QsGhEQRBCk6rtimPs8OdXXRIBEGQolOrTdojF7dWRxUdDkEQpOjUapP2LDvMowsPhSAIUnh61aaWGBKksiEIglSeX2W5dUv1I+vXLTvCZYkRBEGKT7Ga9J+ytMfXpD4oK4IgSIPTLPcQejtXb+u2aAiCIC3Os7Rj6INA3VpdJy3j+kQIgiCNTrWcw3zO0jwkJ9WgLAiCIINOlCkM0kOIehixZUMQBGl5vrmPpcfX9Ri7Hmdv2RAEQVqeb65j6esHX7B+f1d0LAhBECR2BjWIfqYd4+0NjrPsEAiCILt06g077M1t2A+tX2PY8PRRCIIg6SdVVkLdWp1n/T7OhPpe+gOcsdthCIIgwVOoLvy5lvp0Z/r/WNy9rX/NGY8ga8DxnfTgWZUQfkvL8X3rV3fm0tvBL7B+iTMeQRAkeOrUhV/BUp9v/Z7OQ/zN4m5h/e8I4iS4IYwrSA3XoVlfaAN17+9tr7LAV1jX99S5gngpcgUpIBdPeWtL8V3rV3Wmutjijrb+FwRxEhwQxhVkAKSCIVeynF+3fpdA7qdb7LsW8VxBAiDXhSJIEdgNaV9mP9ftkbfpKd87Wtc7WGoI4iW5IQ5BisCuSXsH+9m3rF85cGgtHPf5HfEIEoDJFaQIniOtpJAcksTbzrXAQx+DRxAvTa4gReR8aV9tYS/1hW5FXWr99tZ/ekgOBAlA5QpSBG9kWv1Crl/M9Qu6t73GAvX7y6ENQbxEuYIUkRuXVm/l6i1dvbXrbVqP95jFVQRBvBRHxvFL+khgzuGvtzg9DuJt/7bAe1j/zooEXEG8ZLmCFJEbnlaPkehxEj1W4m2rbq228yGIlyyCFJEbllYPIOpBRD2Q6G36joh+f/nXmgQI4qWLIEXkhqV9sw17zrChS0dJirstJFuXBkECkNeF8jtIEVhLe1/rX7EeYfxKiz91wEtEkAGQPEMixfMcby4x17SJ6tboZoEJf89i777h1mo7PYIEQHMFKYK3Ju077GcnBw6rDwT1e4eW/xnSEGQIJccYriAOaBtCtGSPlu6JsNWn7a8d8dIQZASsMUMjRRxznLmMzdi7/NsGS28N67OPoQ1BhpIaOQ5BRgLbMPwM+/mJgZT/tNg7W9en5mMagoyhNWIsgoyAtWGonrDVgtOR9mILfp0jAYI4oA0JQZAhlDaP0RYF+hJTZO/yb1r8vaxvfwlq81EPjECQMbRGjEWQEbDWDP2A/ewJgVT/sNg7Wf+JMweCOMFtCkOQTYQ2/1zbo2mbtEjTg4xvDCRAkAC8daEIEgOrjTV1axXZu1wrImplxP8GXgqCBOAhSBE8S/tR648KpNeCb1p84WeBHApFkCDAVeFcQfxgH2OhH/GHb0WeYl0PNEYbgkQJrohHEB9Y3VLps4ojfeFbUfqOiB5ojNxabR8eQQKFWBeKID6wZ1vYcb7QrSitqavFF34eyLEzFEGSQB6aBkHGg32ihbxvfNhBEc+2v701mANBEgGuSoUg4yDrg0DdWun/2N52ngXez/r/vAmWxHEFSYS5MxWCjAN7jg3XqobepoWmdWv1C2+CFXEIkgx0Ox2CDAf7NBu6vVj08KiDRz7L/qrvimQ3BMkmusiHIMPAZuxd/mU7lPYRzLy12n71CDKsjqNHIchmZGKkTTKP3Tx05Yg/209uZ/3CQI51oQhSBBZBNoPVbdHbNg9bO2LnXh7BVEvDEaSCquVEkPVgM/Yu19dvH1hUP26xisEiyGrAWglRy/Z49y5X5j9Zv631XxXXkStIEWAEWQ1Wz0m9Kcj9JIs/M5hjSDiCDKHkGIMgy6FF9y5XVn1m8lBHTTwhCOKhNiAGQQ6HdEX7Jz1IqNXUve2Pi1uri7wJRsYhyEhgQ4cjyOGkXmT/5Fk4YWemJ9tfos9rDa2hxiHIGFojxiLIwbBuY3/VHhzevcuV7TPWHz6iBhlDESSD4pIcCHIAirZG+4Z1rUvlbX+wQEl2sTeBMw5BnOA2hSHIAUIvtz+eugnYhp9rZZMPBXN4whHEQ21ADIJcBilj73J9ieoRA5hXDEGQCqqWE0H27buKcdDe5XoM3dt+v7i1+q03QTAOQYIAV4UjyL592v/vJUG+j7X4s4I5IuEIEqG3JnbugtzV2Ghdqsje5R+3+MjSPxmlRZAMiktyzFkQvZWrXZxuFWD7u8Wtlf67mw1BiujPWZA3GNPnB7k+0uI/EcyREY4gGRS5glxOQKuof9V6ZO9yLRr3uKK6jE2LIGOJDRw/xyuI9i7/gfWjBzJaNkzvVukDQb17NYWGIEVVmKMgbzGWWpcq0o634E9HEiTHIkgy0O10cxMkY+/yDxq8E4rq4U2LIF5yG+LmJEjG3uW/WdxaXVJUD29aBPGSQ5DLCbzT/vSMIMeHWfxngzkqwhGkgqrlnMsVROtRafGESHuvBT8lkqAwFkGK4M5BEO1drl2gbhRgqG8GavEFfVNwig1BiqoyB0G0aMJTg/y0xfO5wRyV4QhSRLd3QbRoQvR3hjMsh9blnXJDkKLq9CyI9i7XVgU3CLD7tcXqA0GtbzXlhiBF1elZEH1e8fgANy0y/SDr0V/uAy9hcCiCDEY1bmCvguibfZ8ch+Kw0afbvzwvmKNVOIIUke5REO1drlur6wWY6TF4rYt1aSBHy1AEKaLdoyAfM1Z6DN3b/mqBx1iP7l3uPb4nDkE81AbE9CaIvvr64QHzXjek9aJvwZe7FY4gGRSX5OhJkOvb/PSBYGTv8vdY/IlFrCvTIkgR3Z4E0ePnkRUNL1j83qE9zPdaQ5CiivUiyJOMj56V8jZ9Aepk6/rcYy82PamsvUwi7TQL3h9J0GNsL4L80opzkx4L1HBOenNC21RnNG0YpBVj9nzrRRCthXvUnq9GPxO40KZy0x6mgyA9VHF6c0CQidWEK8i0CoIg06rH1nYD3GJNpygIMp1abL0SBJlWQRBkWvVAkInVA0EmVhCuINMqCIJMqx5cQSZWDwSZWEG4gkyrIAgyrXpwBZlYPRBkYgXhCjKtgiDItOrBFWRi9UCQiRWEK8i0CoIg06rH7F8N3wcpOgV6eVixCM+eSYsgRaVCkCKwjdMiSBFwBCkC2zgtghQBR5AisI3TIkgRcAQpAts4LYIUAUeQIrCN0yJIEXAEKQLbOC2CFAFHkCKwjdMiSBFwBCkC2zgtghQBR5AisI3TIkgRcAQpAts4LYIUAUeQIrCN0yJIEXAEKQLbOC2CFAFHkCKwjdMiSBFwBCkC2zgtghQBR5AisI3TIkgRcAQpAts4LYIUAUeQIrCN0yJIEXAEKQLbOC2CFAFHkCKwjdMiSBFwBCkC2zgtghQBR5AisI3TIkgRcAQpAts4LYIUAUeQIrCN0yJIEXAEKQLbOC2CFAFHkCKwjdMiSBFwBCkC2zgtghQBR5AisI3TIkgRcAQpAts4LYIUAUeQIrCN0yJIEXAEKQLbOO3V7Hj7g8c83+K/FMzRXTiCdFdSJpRJAEEyaZKrOwII0l1JmVAmAQTJpEmu7gggSHclZUKZBBAkkya5uiOAIN2VlAllEkCQTJrk6o4AgnRXUiaUSQBBMmmSqzsCCNJdSZlQJgEEyaRJru4IIEh3JWVCmQQQJJMmubojgCDdlZQJZRJAkEya5OqOAIJ0V1ImlEkAQTJpkqs7AgjSXUmZUCYBBMmkSa7uCCBIdyVlQpkEECSTJrm6I4Ag3ZWUCWUSQJBMmuTqjgCCdFdSJpRJAEEyaZKrOwII0l1JmVAmAQTJpEmu7gggSHclZUKZBBAkkya5uiOAIN2VlAllEkCQTJrk6o4AgnRXUiaUSQBBMmmSqzsCCNJdSZlQJgEEyaRJru4IIEh3JWVCmQQQJJMmubojgCDdlZQJZRJAkEya5OqOAIJ0V1ImlEkAQTJpkqs7AgjSXUmZUCYBBMmkSa7uCPwfCGzN2B9wXzsAAAAASUVORK5CYII="

const returnTexture = (text) => {
    const newcanvas = document.createElement("canvas");
    const textCtx = newcanvas.getContext("2d");

    const width = canvas.width;
    const height = canvas.height;

    textCtx.canvas.width = width;
    textCtx.canvas.height = height;


    textCtx.font = "40px arial";
    textCtx.textAlign = "center";
    textCtx.textBaseline = "middle";
    textCtx.fillStyle = "red";

    textCtx.clearRect(0, 0, textCtx.canvas.width, textCtx.canvas.height);
    textCtx.fillText(text, width / 4, height / 4);
    // console.log(textCtx.canvas);
    return textCtx.canvas;
}

const pixels = new Uint8Array([
	255,255,255,		230,25,75,			60,180,75,			255,225,25,
	67,99,216,			245,130,49,			145,30,180,			70,240,240,
	240,50,230,			188,246,12,			250,190,190,		0,128,128,
	230,190,255,		154,99,36,			255,250,200,		0,0,0,
]);




const vertexDataBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexDataBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertecies, gl.STATIC_DRAW);
gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(0);



const textureUniform = gl.getUniformLocation(program, "uSampler");


const canvasImage = returnTexture("1");

const loadImage = () => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener("load", () => resolve(image));
        image.src = canvasImage.toDataURL();
        image.src = "assets/full_size_atlas.png";
    })
}

const run = async() => {
    const m = await loadImage();

    console.log(m);
    
    // console.log(gl.getParameter(gl.ACTIVE_TEXTURE))
    const texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);
    gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(1);
    

    

    const texture2 = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture2);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, canvas.width / 2, canvas.height / 2, 0, gl.RGB, gl.UNSIGNED_BYTE, m);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        
    
    gl.drawArrays(gl.TRIANGLES, 0, 3);

}
// exprt = '8.898437 * 9 + 7.7228125 + 4.4453125'



run();