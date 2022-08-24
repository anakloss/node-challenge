const Character = function(id, name, age, weight) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.weight = weight;
}

//add image, history, movies

Character.prototype.toString = function() {
    return 'name: ' + this.name + " | age: " + this.age;
}

Character.allCharacter = [];
Character.add = function(aChar) {
    Character.allCharacter.push(aChar);
}

Character.findById = function(aCharId) {
    let aChar = Character.allCharacter.find(x => x.id == aCharId);
    if (aChar) return aChar;
    else throw new Error(`No se encuentra personaje con el id ${aCharId}`);
}

Character.removeById = function(aCharId) {
    for(let i=0; i<Character.allCharacter.length; i++) {
        if (Character.allCharacter[i].id == aCharId) {
            Character.allCharacter.splice(i, 1);
            break;
        }
    }
}

let a = new Character(1, 'Juan', 25, 80.5);
let b = new Character(2, 'Maria', 20, 61.0);
Character.add(a);
Character.add(b);

module.exports = Character;