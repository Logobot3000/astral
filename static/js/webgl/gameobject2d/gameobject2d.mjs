export default class GameObject2D {
    constructor (game, x, y, width, height) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    Start = () => {}

    Update = () => {
        this.Draw();
    }

    Draw = () => {
        this.positions = {
            x1: this.x,
            x2: this.x + this.width,
            y1: this.y,
            y2: this.y + this.height
        };

        this.vertices = [
            this.positions.x1, this.positions.y1,
            this.positions.x2, this.positions.y1,
            this.positions.x1, this.positions.y2,
            this.positions.x1, this.positions.y2,
            this.positions.x2, this.positions.y2,
            this.positions.x2, this.positions.y1
        ];

        this.game.gl.bufferData(this.game.gl.ARRAY_BUFFER, new Float32Array(this.vertices), this.game.gl.STATIC_DRAW);
        this.game.gl.drawArrays(this.game.gl.TRIANGLES, 0, 6);
    }
}