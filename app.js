const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Character {
    constructor(name, health, attackPower) {
        this.name = name;
        this.health = health;
        this.attackPower = attackPower;
        this.inventory = [];
    }

    attack(target) {
        const damage = Math.floor(Math.random() * this.attackPower) + 1;
        console.log(`\n ${this.name} attacks ${target.name} for ${damage} damage.`);
        target.takeDamage(damage);
    }

    takeDamage(amount) {
        this.health -= amount;
        console.log(`\n ${this.name} takes ${amount} damage. Remaining health: ${this.health}`);
        if (this.health <= 0) {
            console.log(`\n ${this.name} has been defeated.`);
        }
    }

    pickUpItem(item) {
        this.inventory.push(item);
        console.log(`\n ${this.name} picked up ${item.name}.`);
    }
}

class Item {
    constructor(name, type, value) {
        this.name = name;
        this.type = type;
        this.value = value;
    }
}

class Location {
    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.characters = [];
        this.items = [];
    }

    enterLocation(character) {
        this.characters.push(character);
        console.log(`\n ${character.name} enters ${this.name}. ${this.description}`);
    }

    searchLocation() {
        if (this.items.length === 0) {
            console.log('\n No items found in this location.');
        } else {
            console.log('\n Items found in this location:');
            this.items.forEach(item => {
                console.log(`\n - ${item.name} (${item.type})`);
            });
        }
    }
}

const player = new Character('Adventurer', 100, 20);
const slime = new Character('slime', 80, 20);
const minatour = new Character('Minatour', 90, 15);

const sword = new Item('Sword', 'weapon', 30);
const potion = new Item('rage potion', 'strength', 40);
const script = new Item('Scroll', 'quest', null);

const forest = new Location('Fairy Forest', 'A mythical fairy forest filled with fairies located behind the castle.');
const mountain = new Location('Mountain', 'A large mountain oblivious to warmth and easy passage.');
const castle = new Location('Castle', 'A mighty castle built long ago by the kings great grandfather. it reaches the sky in hieght and its beauty is breath-taking.');

forest.items.push(sword);
mountain.items.push(potion);
castle.items.push(script);

forest.searchLocation();

castle.enterLocation(player);

console.log("\n Welcome warrior to the Adventure Quest if Scriptoria! \n You are in the Castle of the king, he has assigned you, an Adventurer with the task of freeing the world from the tyranny of a monster that lurks within the mountains of the kingdom.\n Grab your sword and head out to complete your mission");
rl.question('\n to take it, enter the command "pick"  ', (command) => {
    if (command.toLowerCase() === "pick") player.pickUpItem(sword);
    console.log("\n Before you are two destinations; a mountain and a forest.\n You can travel through the depths of the mountain and battle the Minatour and free your kingdom from its tryanny, but you are not strong enough yet.\n you can go into the fairy forest and find a potion made by the fairies that will increase your power 10 folds. so which will you choose warrior? ");
    console.log();
    rl.question('\n What will be your first destination? mountain or Fairy Forest  ', (answer) => {
        if (answer.toLowerCase() === "fairy forest") {
            forest.enterLocation(player);
            console.log("\n you have crossed path with a slime gaurding the potion. it is a low level creature but witty. will you attack or flee?");
            console.log();
            rl.question('\n Do you want to attack or flee? ', (inputForAction) => {
                if (inputForAction.toLowerCase() === "attack") {
                    // Game fight
                    while (true) {
                        player.attack(slime);
                        console.log();
                        if (slime.health <= 0) break;
                        slime.attack(player);
                        console.log();
                        if (player.health <= 0) break;
                    }
                }
                if (slime.health <= 0) {
                    console.log("\n you valiantly battled and triumphed. Now you have to defeat the slime");
                    console.log();
                    rl.question('\n Before you face the final beast, search the cave to find a potion that will increase your power ability! \n To do that, enter the command "search" ', (searchInput) => {
                        if (searchInput.toLowerCase() === "search") mountain.searchLocation();
                        console.log("\n the rage potion is right over there.");
                        console.log();
                        rl.question('\n If you want to pick up the item, enter "pick" ', (answer) => {
                            if (answer.toLowerCase() === "pick") player.pickUpItem(potion);
                            console.log();
                            rl.question('\n are you prepared for war against the beast? (yes/no) ', (inputLocation) => {
                                console.log();
                                if (inputLocation.toLowerCase() === "yes") mountain.enterLocation(player);
                                console.log();
                                console.log("The Minatour stands before you, its eyes glowing red and its mouth wide open ready to eat you. will you attack or flee?");
                                console.log();
                                rl.question('\n Do you want to attack or flee?', (inputForAction) => {
                                    if (inputForAction.toLowerCase() === "attack") {
                                        // Game fight
                                        while (true) {
                                            player.attack(minatour);
                                            console.log();
                                            if (minatour.health <= 0) break;
                                            minatour.attack(player);
                                            console.log();
                                            if (player.health <= 0) break;
                                        }
                                        console.log();
                                        if (player.health <= 0) console.log("\n You have been defeated. The kingdom mourns your death");

                                        if (minatour.health <= 0) console.log("\n You triumphed and the Minatour is now dead. The people of your kingdom can now live worry-free.");
                                    }
                                });
                            });
                        });
                    });
                }
            });
        } else {
            mountain.enterLocation(player);
            console.log("\n You have made your way to the minatours hideout. will you attack or flee?");
            console.log();
            rl.question('\n Do you want to attack or flee?  ', (inputForAction) => {
                if (inputForAction.toLowerCase() === "attack") {
                    // Game fight
                    while (true) {
                        player.attack(minatour);
                        console.log();
                        if (minatour.health <= 0) break;
                        minatour.attack(player);
                        console.log();
                        if (player.health <= 0) break;
                    }
                    console.log();
                    if (player.health <= 0) console.log("\n You have been defeated");

                    if (minatour.health <= 0) console.log("\n you have killed the beast and freed the world from its tyranny");
                }
            });
        }
    });
});



  
  
  
  
  
  
  





