import Archetype, { Mage } from './Archetypes';
import Energy from './Energy';
import Fighter from './Fighter';
import Race, { Elf } from './Races';
import getRandomInt from './utils';

export default class Character implements Fighter {
  private _race: Race;
  private _archetype: Archetype;
  private _maxLifePoints: number;
  private _lifePoints: number;
  private _strength: number;
  private _defense: number;
  private _dexterity: number;
  private _energy: Energy;

  constructor(
    name:string,
  ) {
    this._dexterity = getRandomInt(0, 10);
    this._race = new Elf(name, this._dexterity);
    this._strength = getRandomInt(0, 10);
    this._defense = getRandomInt(0, 10);
    this._archetype = new Mage(name);
    this._energy = { amount: getRandomInt(0, 10),
      type_: 'mana' };
    this._maxLifePoints = this.race.maxLifePoints / 2;
    this._lifePoints = this._maxLifePoints;  
  }

  get race():Race {
    return this._race;
  }

  get archetype():Archetype {
    return this._archetype;
  }

  get lifePoints(): number {
    return this._lifePoints;
  }

  get strength(): number {
    return this._strength;
  }

  get defense(): number {
    return this._defense;
  }

  get dexterity(): number {
    return this._dexterity;
  }

  get energy(): Energy {
    return { ...this._energy };
  }

  receiveDamage(attackPoints: number): number {
    const damage = attackPoints - this.defense;   
    if (damage > 0) {
      this._lifePoints = this.lifePoints - damage;
    }
    if (damage <= 0) {
      this._lifePoints = this.lifePoints - 1;
    }
    if (damage >= this.lifePoints) {
      this._lifePoints = -1;
    }
    return this.lifePoints;
  }

  attack(enemy: Fighter): void {
    enemy.receiveDamage(this.strength);
  }

  levelUp(): void {
    this._maxLifePoints += getRandomInt(1, 10);
    if (this._maxLifePoints > this.race.maxLifePoints) {
      this._maxLifePoints = this.race.maxLifePoints;
    }
    this._strength += getRandomInt(1, 10);
    this._dexterity += getRandomInt(1, 10);
    this._defense += getRandomInt(1, 10);
    this._lifePoints = this._maxLifePoints;
    this._energy.amount = 10;
  }
}