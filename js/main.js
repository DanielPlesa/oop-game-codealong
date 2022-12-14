
class Game {
    constructor() {
        this.player = null; //will store an instance of the class Player
        this.obstacles = []; //will store instances of the class Obstacle
    }

    start() {
        this.player = new Player();
        this.attachEventListeners();



        setInterval(() => {
            //creates new obstacle
            const newObstacle = new Obstacle();
            this.obstacles.push(newObstacle);
        }, 1000);

        //moving obstacles
        setInterval(() => {
            this.obstacles.forEach((obstacleInstance) => {

                obstacleInstance.moveDown();//move obstacle

                //detecting colision
                this.detectCollision(obstacleInstance);

                //check if we need to remove the current obstacles
                this.removeObstacleIfOutside(obstacleInstance);

            });
        }, 50);

    }
    attachEventListeners() {
        document.addEventListener("keydown", (event) => {
            if (event.key === "ArrowLeft") {
                this.player.moveLeft();
            } else if (event.key === "ArrowRight") {
                this.player.moveRight();
            }
        });
    }
    detectCollision(obstacleInstance) {
        if (
            this.player.positionX < obstacleInstance.positionX + obstacleInstance.width &&
            this.player.positionX + this.player.width > obstacleInstance.positionX &&
            this.player.positionY < obstacleInstance.positionY + obstacleInstance.height &&
            this.player.height + this.player.positionY > obstacleInstance.positionY
        ) {
            location.href = 'gameover.html';
        }

    }

    removeObstacleIfOutside(obstacleInstance) {
        if (obstacleInstance.positionY < 0) {
            obstacleInstance.domElement.remove(); //removes from the dom
            this.obstacles.shift(); //remove from the array

        }
    }
}


class Player {
    constructor() {
        this.positionX = 50;
        this.positionY = 0;
        this.width = 20;
        this.height = 10;
        this.domElement = null;

        this.createDomElement();
    }
    createDomElement() {
        // create dom element
        this.domElement = document.createElement('div');

        // set id and css
        this.domElement.id = "player";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.bottom = this.positionY + "vh";
        this.domElement.style.left = this.positionX + "vw";

        // append to the dom
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElement)
    }
    moveLeft() {
        this.positionX -= 5;
        this.domElement.style.left = this.positionX + "vw";
    }
    moveRight() {
        this.positionX += 5;
        this.domElement.style.left = this.positionX + "vw";

        // if(player.moveRight()> 977){
        //     player.setX(1024);
        //  } else if}
        // }

        //        let futurePositionX = this.positionX + "x";

        //     if ( futurePositionX < rightScreenBound ) {
        //         this.PositionX = futurePostionX;
        //     } else {
        //         this.PositionX = rightScreenBound;
        //     }
        //     }
    }
}

class Obstacle {
    constructor() {
        this.width = 10;
        this.height = 10;
        this.positionX = (Math.floor(Math.random() * (100 - this.width + 1))); //generates a random number between 0 and 100-width

        this.positionY = 90;

        this.domElement = null;

        this.createDomElement();
    }
    createDomElement() {
        // create dom element
        this.domElement = document.createElement('div');

        // set id and css
        this.domElement.className = "obstacle";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.bottom = this.positionY + "vh";
        this.domElement.style.left = this.positionX + "vw";

        // append to the dom
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElement)
    }
    moveDown() {
        this.positionY--;
        this.domElement.style.bottom = this.positionY + "vh";
    }
}

const game = new Game();
game.start();


