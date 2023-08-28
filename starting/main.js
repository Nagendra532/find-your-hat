const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

let current = true;

class Field {
    constructor(field) {
        this._field = field;
        this.y = 0;//row
        this.x = 0;//column
    }

    get field() {
        return this._field;
    }
    
    print(){
        for(let i=0; i<this.field.length; i++){
          console.log(this.field[i].join(""));
        }
      }

    // checking by moving in directions
    checkmoves() {
        let move = prompt('Move in which way (t-top, d-down, l-left, r-right)');
        switch(move.toLowerCase()) {
            case 't':
                console.log('Moves up');
                this.y -= 1;   //move to previous row
                break;
            case 'd':
                console.log('Moves down');
                this.y += 1;   //move to next row
                break;
            case 'l':
                console.log('Moves left');
                this.x -= 1;
                break;
            case 'r':
                console.log('Moves right');
                this.x += 1;
                break;
            default:
                break;
        }    
    }


    gamestatus() {
       if (this.field[this.y] == undefined) {
            console.log('You lose - Out of boundary');
            return current = false;            
        }
        
        switch (this.field[this.y][this.x]) {
            case hole:
                console.log('You lose - fell in a hole!');
                current = false;
                break;
            case undefined:
                console.log('You lose - Out of boundary');
                current = false;
                break;
            case hat:
                console.log('You won - found the hat!');
                current = false;
                break;
            case fieldCharacter:
                console.log('Keep searching for hat...');
                this.field[this.y][this.x] = pathCharacter;
                break;
            case pathCharacter:
                console.log('You are stepping on *');
                break;
        }    
    }

    static generateField(height, width, percentage) {
        const field = new Array(height).fill(0).map(el => new Array(width));
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const prob = Math.random();
            field[y][x] = prob > percentage ? fieldCharacter : hole;
          }
        }
        
        const hatLocation = {
          x: Math.floor(Math.random() * width),
          y: Math.floor(Math.random() * height)
        };
        
        // while (hatLocation.x === 0 && hatLocation.y === 0) {
        //   hatLocation.x = Math.floor(Math.random() * width);
        //   hatLocation.y = Math.floor(Math.random() * height);
        // }
        field[hatLocation.y][hatLocation.x] = hat;
        return field;
      }
}

const myField = new Field(Field.generateField(5,5,0.1));

function playgame() {
    while(current) {
        console.log(myField.print());
        myField.checkmoves();
        myField.gamestatus();
    }
    console.log('Game Over!');
}
playgame();