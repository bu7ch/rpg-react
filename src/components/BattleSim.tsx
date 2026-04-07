import { useState } from "react"
import FighterCard from "./FighterCard"

type Fighter = {
    name: string,
    hp:number;
    maxHp:number;
    emoji:string
}
const INITIAL_HERO : Fighter = {name: "Héros", hp: 100, maxHp: 100, emoji:"" };
const INITIAL_ENEMY : Fighter = {name: "Dragon", hp: 80, maxHp: 80, emoji:"" };

const rollDice = (faces: number) => Math.floor(Math.random() * faces) + 1;

function BattleSim() {
    const [hero, setHero] = useState(INITIAL_HERO);
    const [enemy, setEnemy] = useState(INITIAL_ENEMY);
    const [log , setLog] = useState('Le combat commence. A toi de jouer !');

    const isOver = hero.hp <= 0 || enemy.hp <= 0;
    const hasWon = enemy.hp <= 0;

// actions
const handleAttack =() => {
    const dmg = rollDice(10);
    setEnemy(prev=>({...prev, hp:Math.max(0, prev.hp - dmg)}));
    setLog(`Tu attaques et tu infliges ${dmg} degâts au ${enemy.name}`)

}

const handleDefend =() => {
    const heal = 5;
    const counterDmg =rollDice(6);
    setHero(prev=> ({...prev, hp: Math.min(prev.maxHp, Math.max(0, prev.hp + heal - counterDmg))}));
    setLog(`Tu te defends (+${heal} PV) mais le dragon riposete pour ${counterDmg} dégâts`);
}

const handleReset = () => {
    setHero(INITIAL_HERO)
    setEnemy(INITIAL_ENEMY)
    setLog('Le combat recommence. A toi de jouer !');
}


  return (
    <>
    <div style={{ display:'flex', flexDirection: 'column', gap:16, maxWidth:480}}>
        <div style={{ display:'grid', gridTemplateColumns: '1fr 1fr', gap:12}}>
        <FighterCard fighter={hero} />
        <FighterCard fighter={enemy} />
        </div>

        <div>
            {log}
        </div>

    {isOver ? (
        <div>
            <p>
            {hasWon ? 'Victoire' : 'Défaite'};
        </p>
        <p>
            {hasWon ? 'Tu as terrassé le dragon' : "Ldargon t'as vaincu."};
        </p>
        <button onClick={handleReset}> Nouvelle partie</button>
        </div>
        
    ):(
        <div>
            <button onClick={handleAttack}>Attaquer</button>
            <button onClick={handleDefend}>Se defendre</button>
        </div>
    )}
    </div>
    
        
    </>
  )
}

export default BattleSim