import { mat4 } from "gl-matrix";

class HorizontalLine {
    constructor(y = 0) {
        this.lineModelMat4 = mat4.create();
        
        mat4.translate(this.lineModelMat4, this.lineModelMat4, [0, y, 0]);
        mat4.scale(this.lineModelMat4, this.lineModelMat4, [1, 0.01, 1]);
        

        this.lineGeomData = null;

        this.build_line();
    }


    build_line() {
        // const line = new Float32Array([
        //     0.0 - 0.3,    -4.0,   0.0,
        //     0.0 - 0.3,     4.0,   0.0,
        //     0.0 + 0.3,    -4.0,   0.0,
            
        //     0.0 + 0.3,    -4.0,   0.0,
        //     0.0 + 0.3,     4.0,   0.0,
        //     0.0 - 0.3,     4.0,   0.0 
        // ])

        const line = new Float32Array([
            -4.0,   0.0 - 0.3,    0.0,
            -4.0,   0.0 + 0.3,    0.0,
             4.0,   0.0 + 0.3,    0.0,

             4.0,   0.0 - 0.3,    0.0,
             4.0,   0.0 + 0.3,    0.0,
            -4.0,   0.0 - 0.3,    0.0
        ])

        this.lineGeomData = line;
    }
}

export default HorizontalLine;