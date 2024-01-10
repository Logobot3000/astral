export default class Game {
    constructor() {
        return (async () => {
            this.canvas = document.getElementById('c');
            this.canvasView = document.querySelector('.canvas-view');

            this.canvas.height = this.canvasView.clientHeight;
            this.canvas.width = this.canvasView.clientWidth;

            window.addEventListener('resize', () => {
                this.gl.viewport(0, 0, this.canvasView.clientWidth, this.canvasView.clientHeight);
            });

            this.gl = this.canvas.getContext('webgl');
            this.gl.clearColor(0, 0, 0, 1);

            this.time = {
                deltaTime: 0,
                now: 0,
                fps: 0
            }

            this.programInfo = {
                program: await this.#createProgram(),
                attributeLocations: {},
                uniformLocations: {}
            }

            this.programInfo.attributeLocations.position = this.gl.getAttribLocation(this.programInfo.program, "aPosition");
            this.programInfo.uniformLocations.resolution = this.gl.getUniformLocation(this.programInfo.program, "uResolution");
            this.programInfo.uniformLocations.color = this.gl.getUniformLocation(this.programInfo.program, "uColor");

            this.buffers = {
                position: this.gl.createBuffer()
            }

            this.objects = [];

            return this;
        })();
    }

    Start = () => {}

    Update = () => {}

    #Loop = (now) => {
        this.time.deltaTime = now - this.time.now;
        this.time.now = now;
        this.time.fps = 1000 / this.time.deltaTime;

        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        this.gl.useProgram(this.programInfo.program);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.position);

        this.gl.vertexAttribPointer(this.programInfo.attributeLocations.position,
            2, this.gl.FLOAT, false, 0, 0);

        this.gl.uniform2f(this.programInfo.uniformLocations.resolution, this.canvas.width, this.canvas.height);

        this.gl.enableVertexAttribArray(this.programInfo.attributeLocations.position);

        this.Update();

        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].Loop();
        }

        requestAnimationFrame(this.#Loop);
    }

    #createProgram = async () => {
        const vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        const vertexShaderSource = await fetch('/js/webgl/shaders/vertex.vert')
            .then(r => r.text());
        this.gl.shaderSource(vertexShader, vertexShaderSource);
        this.gl.compileShader(vertexShader);
        const vertexSuccess = this.gl.getShaderParameter(vertexShader, this.gl.COMPILE_STATUS);
        if (!vertexSuccess) {
            console.error(this.gl.getShaderInfoLog(vertexShader));
            this.gl.deleteShader(vertexShader);
            return;
        }

        const fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        const fragmentShaderSource = await fetch('/js/webgl/shaders/fragment.frag')
            .then(r => r.text());
        this.gl.shaderSource(fragmentShader, fragmentShaderSource);
        this.gl.compileShader(fragmentShader);
        const fragmentSuccess = this.gl.getShaderParameter(fragmentShader, this.gl.COMPILE_STATUS);
        if (!fragmentSuccess) {
            console.error(this.gl.getShaderInfoLog(fragmentShader));
            this.gl.deleteShader(fragmentShader);
            return;
        }

        const program = this.gl.createProgram();
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        this.gl.linkProgram(program);
        const success = this.gl.getProgramParameter(program, this.gl.LINK_STATUS);
        if (!success) {
            console.log(this.gl.getProgramInfoLog(program));
            this.gl.deleteProgram(program);
        }

        return program;
    }

     Run() {
        this.Start();

        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].Start();
        }

        requestAnimationFrame(this.#Loop);
    }
}