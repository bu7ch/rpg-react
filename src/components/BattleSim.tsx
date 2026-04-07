import { useState } from "react"
import FighterCard from "./FighterCard"

type Fighter = {
    name: string,
    hp:number;
    maxHp:number;
    emoji:string
}
const INITIAL_HERO:  Fighter = { name: 'Héros',  hp: 100, maxHp: 100, emoji: '🧙' };
const INITIAL_ENEMY: Fighter = { name: 'Dragon', hp: 80,  maxHp: 80,  emoji: '🐉' };

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
        <div style={{ textAlign: 'center', padding: '16px', borderRadius: 12,
          background: hasWon ? '#E1F5EE' : '#FCEBEB',
          border: `0.5px solid ${hasWon ? '#5DCAA5' : '#F09595'}` }}>
          <p style={{ fontSize: 16, fontWeight: 500, color: hasWon ? '#085041' : '#791F1F' }}>
            {hasWon ? '🏆 Victoire !' : '💀 Défaite...'}
          </p>
          <p style={{ fontSize: 13, margin: '4px 0 12px', color: hasWon ? '#0F6E56' : '#A32D2D' }}>
            {hasWon ? 'Tu as terrassé le Dragon !' : 'Le Dragon t\'a vaincu.'}
          </p>
          <button onClick={handleReset}>🔄 Nouvelle partie</button>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={handleAttack} style={{ flex: 1 }}>⚔️ Attaquer</button>
          <button onClick={handleDefend} style={{ flex: 1 }}>🛡️ Se défendre</button>
        </div>
      )}
    </div>
    
        
    </>
  )
}

export default BattleSim