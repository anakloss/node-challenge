const Character = function(name, age, weight) {
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

let a = new Character('Juan', 25, 80.5);
let b = new Character('Maria', 20, 61.0);
Character.add(a);
Character.add(b);

module.exports = Character;