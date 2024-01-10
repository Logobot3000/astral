export default class GameObject2D {
    constructor (game, x, y, width, height, color) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    Start = () => {}

    Update = () => {}

    Loop = () => {
        this.Update();
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
        this.game.gl.uniform4f(this.game.programInfo.uniformLocations.color,
            this.color[0] / 255, this.color[1] / 255, this.color[2] / 255, this.color[3]);
        this.game.gl.drawArrays(this.game.gl.TRIANGLES, 0, 6);
    }
}