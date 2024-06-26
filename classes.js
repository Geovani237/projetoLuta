//Knight ou Sorcerer
// LittleMonster ou BigMonster
class Character {

    _life = 1;
    maxLife = 1;
    attack = 0;
    defense = 0;

    constructor(name) {
        this.name = name;
    }

    get life () {
        return this._life
    }

    set life(newLife){
        this._life = newLife < 0 ? 0 : newLife;
    }
}

class Knight extends Character {
    constructor(name) { // constructor seve para criar e inicializar um objeto criado a partir de uma classe.
        super(name); // super server para chamar o contrutor da classe pai.

        this.life = 100;
        this.attack = 10;
        this.defense = 8;
        this.maxLife = this.life;
    }
}

class Sorcerer extends Character {
    constructor(name) {
        super(name);

        this.life = 80;
        this.attack = 15;
        this.defense = 3;
        this.maxLife = this.life;
    }
}

class LittleMonster extends Character {
    constructor() {
        super('Little Monster')
        this.life = 40;
        this.attack = 4;
        this.defense = 4;
        this.maxLife = this.life;
    }
}

class BigMonster extends Character {
    constructor() {
        super('Big Monster');
        this.life = 120;
        this.attack = 16;
        this.defense = 6;
        this.maxLife = this.life;
    }
}

class Stage {
    constructor(fighter1, fighter2, fighter1El, fighter2El, logObject) {
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighter1El = fighter1El;
        this.fighter2El = fighter2El;
        this.log = logObject;
    }

    start() {
        this.update();

        // botão de atacar 
        this.fighter1El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2));
        this.fighter2El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1));

    }

    update() { // atualizar a tela com as informçôes dos dois lutadores 
        // fighter 1
        // colocando na tela o nome do personagem e sua vida
        this.fighter1El.querySelector('.name').innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(1)} HP`; 
        
        // calcular a porcetangem
        let f1Pct = (this.fighter1.life / this.fighter1.maxLife) * 100;

        //preencher a barrinha vermelha com a porcentagem 
        this.fighter1El.querySelector('.bar').style.width = `${f1Pct}%`
         

        // fighter 2
        this.fighter2El.querySelector('.name').innerHTML = `${this.fighter2.name} - ${this.fighter2.life.toFixed(1)} HP`;
        let f2Pct = (this.fighter2.life / this.fighter2.maxLife) * 100;
        this.fighter2El.querySelector('.bar').style.width = `${f2Pct}%`

    }

    //função de atacar 
    doAttack(attacking, attacked) {
        //console.log(`${attacking.name} está atacando ${attacked.name}`);

        //verificação se quem está atacando está vivo ou morto 
        if(attacking.life <= 0 || attacked.life <= 0) {
            this.log.addMessage(`Atacando cachorro morto.`);
            return;
        }

        //fator de ataque e fator de defesa
        let attackFactor = (Math.random() * 2).toFixed(2);
        let defenseFactor = (Math.random() * 2).toFixed(2);


        let actualAttack = attacking.attack * attackFactor;
        let actualDefense = attacked.defense * defenseFactor;

        if(actualAttack > actualDefense) {
            attacked.life -= actualAttack;
            this.log.addMessage(`${attacking.name} causou ${actualAttack.toFixed(2)} em ${attacked.name}`)
        } else {
            this.log.addMessage(`${attacked.name} conseguiu defender...`);
        }
        // atualizar quando ocorre um ataque 
        this.update() 
    }
  }

class Log {
    list = [];
    // receber o elemento de listage
    constructor(listEl) {
        this.listEl = listEl;
    }
    //recebe a msg, adiciona a msg no array
    addMessage(msg) {
        this.list.push(msg);
        //rederizar
        this.render();
    }
    //transformar a lista no visual
    render() {
        //limpa a lista
        this.listEl.innerHTML = '';
        //percorre a lista 
        for(let i in this.list) {
            //preenche a lista
            this.listEl.innerHTML += `<li>${this.list[i]}</li>`
        }
    }
}