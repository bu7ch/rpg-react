

function HpBar({hp, maxHp}:{hp:number, maxHp:number}){
const pct = Math.max(0, (hp/maxHp) *100);
const color = pct > 50 ? '#1D9E75' : pct > 25 ? '#BA7517' : '#E24B4A'

    return (
        <>
        <div style={{ height: 8, background:'fontVariant(--color-background-secondary', borderRadius:99, overflow:'hidden'}}>
            <div style={{ width:`${pct}%`, height:'100%', background:color, borderRadius:99, transition: 'width 0.3s'}}/>
        </div>
        </>
    )
  
}

export default HpBar