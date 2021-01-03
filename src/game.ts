export interface Frame {
    gameOver: boolean;
    gameStarted: boolean;
    width: number;
    height: number;
    score: number;
    firstPipe: PipePair;
    secondPipe: PipePair;
    ground: Ground;
}

export interface Ground {
    height: number;
}

export interface PipePair{
    topPipe: Pipe;
    bottomPipe: Pipe;
    show: boolean;
    left: number;
    width: number;
}

export interface Pipe{
    top: number;
    height: number;
}

export class GameController {
    private frame: Frame;
    private velocity = 0;

    constructor(
        public readonly height = 650,
        public readonly width = 400,
        public readonly pipeWidth = 50,
        public readonly pipeGap = 150,
        public readonly minTopForTopPipe = 70,
        public readonly maxTopForTopPipe = 350,
        public readonly generateNewPipePercent = 0.7,
        public readonly speed = 1,
        public readonly groundHeight = 20,

    ){}

    public newGame(){
        let firstPipe = this.createPipe(true);
        let secondPipe = this.createPipe(false);

        this.frame = {
            score: 0,
            width: this.width,
            height: this.height,
            gameOver: false,
            gameStarted: false,
            firstPipe,
            secondPipe,
            ground:{
                height: this.groundHeight
            }
        }

        return this.frame;
    }

    public nextFrame(){
        this.frame.firstPipe = this.movePipe(
            this.frame.firstPipe,
            this.frame.secondPipe
        );
        this.frame.secondPipe = this.movePipe(
            this.frame.secondPipe,
            this.frame.firstPipe
        );

        return this.frame;
    }

    private randomYForTopPipe():number{
        return (
            this.minTopForTopPipe + (this.maxTopForTopPipe - this.minTopForTopPipe) * Math.random()
        );
    }

    private createPipe(show: boolean): PipePair {
        const height = this.randomYForTopPipe();

        return {
            topPipe:{
                top: 0,
                height
            },
            bottomPipe:{
                top: height + this.pipeGap,
                height: this.height
            },
            left: this.width - this.pipeWidth,
            width: this.pipeWidth,
            show,
        }
    }

    private movePipe(pipe: PipePair, otherPipe: PipePair){
        if(pipe.show && pipe.left <= this.pipeWidth * -1){
            pipe.show = false;
            return pipe;
        }

        if(pipe.show){
            pipe.left -= this.speed;
        }

        if(
            otherPipe.left < this.width * (1 - this.generateNewPipePercent) &&
            otherPipe.show && !pipe.show
        ){
            return this.createPipe(true)
        }

        return pipe;
    }


}
