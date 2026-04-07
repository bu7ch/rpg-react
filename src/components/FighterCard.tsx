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
    <div>{fighter.name}</div>
    <HpBar hp={fighter.hp} maxHp={fighter.maxHp}/> 
    <div style={{fontSize:13}}>{fighter.hp}/{fighter.maxHp}</div>

    </>
 )
}

export default FighterCard