import { mat4 } from "gl-matrix";



class GridLine {
    constructor(x = 1) {
        // this.lineModelMat4 = new Float32Array([
        //     0, -1, 0, 0,
        //     1, 0, 0, 0,
        //     0, 0, 1, 0,
        //     x, 0, 0, 1
        // ]);

        // this.lineModelMat4 = new Float32Array([
        //     0.1, 0, 0, 0,
        //     0, 1, 0, 0,
        //     0, 0, 1, 0,
        //     0, 0, 0, 1
        // ]);

        // this.lineModelMat4[12] = x;

        this.lineModelMat4 = mat4.create();

        
        
        mat4.translate(this.lineModelMat4, this.lineModelMat4, [x, 0, 0]);
        mat4.scale(this.lineModelMat4, this.lineModelMat4, [0.01, 1, 1]);
        

        this.lineGeomData = null;

        this.build_line();
    }


    build_line() {
        const line = new Float32Array([
            0.0 - 0.3,    -4.0,   0.0,
            0.0 - 0.3,     4.0,   0.0,
            0.0 + 0.3,    -4.0,   0.0,
            
            0.0 + 0.3,    -4.0,   0.0,
            0.0 + 0.3,     4.0,   0.0,
            0.0 - 0.3,     4.0,   0.0 
        ])

        this.lineGeomData = line;
    }
}

export default GridLine;