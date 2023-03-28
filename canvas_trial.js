const canvas = document.querySelector("canvas");

const textCtx = canvas.getContext("2d");


let c_width = canvas.clientWidth;
let c_height = canvas.clientHeight;

textCtx.canvas.width = canvas.clientWidth;
textCtx.canvas.height = canvas.clientHeight;


textCtx.font = "180px arial";
textCtx.textAlign = "center";
textCtx.textBaseline = "middle";
textCtx.fillStyle = "red";
// textCtx.letterSpacing = "20px";

textCtx.clearRect(0, 0, textCtx.canvas.width, textCtx.canvas.height);
textCtx.fillText("123456789.", c_width / 2, c_height / 2 + 10);



console.log(canvas.toDataURL())