import HpBar from "./HpBar";


type Fighter = {
    name: string,
    hp:number;
    maxHp:number;
    emoji:string
}

function FighterCard({fighter}: {fighter:Fighter}) {
    const isDead = fighter.hp <= 0;

  return (
    <>
   <div style={{ opacity: isDead ? 0.4 : 1, filter: isDead ? 'grayscale(80%)' : 'none',
      background: 'var(--color-background-primary)', border: '0.5px solid var(--color-border-tertiary)',
      borderRadius: 12, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontSize: 28, textAlign: 'center' }}>{fighter.emoji}</div>
      <div style={{ fontSize: 13, fontWeight: 500 }}>{fighter.name}</div>
      <HpBar hp={fighter.hp} maxHp={fighter.maxHp} />
      <div style={{ fontSize: 13 }}>{fighter.hp} / {fighter.maxHp} PV</div>
    </div>
    </>
 )
}

export default FighterCard