import GridLine from "./GridLine";

import HorizontalLine from "./HorizontalLine";
import VerticalLine from "./VerticalLine";

class Grid {
    constructor(dimensions, thickness, step) {
        this.dimensions = dimensions;
        this.thickness = thickness;
        this.step = step;

        this.vertex_count = 0;


        this.verticalLines = [];
        this.horizontalLines = [];

        // this.verticalLines = 


        for (let i = -10; i <= 10; i++) {
            this.verticalLines.push(new VerticalLine(0.3 * i));
            this.horizontalLines.push(new HorizontalLine(0.3 * i));
        }

            // this.verticalLines.push(new VerticalLine(0));
            // this.horizontalLines.push(new HorizontalLine(0));


    }

    rotateLines() {
        
    }


    draw_on_scene(gl, vertexDataBuffer, program) {
        const modelLoc = gl.getUniformLocation(program, "uModel");


        gl.bindBuffer(gl.ARRAY_BUFFER, vertexDataBuffer);
        
        for (let line of this.verticalLines) {
            gl.bufferData(gl.ARRAY_BUFFER, line.lineGeomData, gl.STATIC_DRAW);

            gl.uniformMatrix4fv(modelLoc, false, line.lineModelMat4);

            gl.enableVertexAttribArray(0);
            gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 12, 0);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
        }
        

        for (let line of this.horizontalLines) {
            gl.bufferData(gl.ARRAY_BUFFER, line.lineGeomData, gl.STATIC_DRAW);

            gl.uniformMatrix4fv(modelLoc, false, line.lineModelMat4);

            gl.enableVertexAttribArray(0);
            gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 12, 0);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
        }
    }
}

export default Grid;