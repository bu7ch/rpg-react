import { useState } from "react"

function HeroHp() {
    const [hp, setHp] = useState(100)
    const [hero, setHero] = useState({name:"Aragorn", 
        hp:100, mp:50
    })
    setHero(prev => ({...prev, hp:90}))


  return (
    <div>
        <p>Point de vie: {hp}</p>
        <button onClick={() => setHp(hp - 10)}> Prendre un coup</button>
        <button onClick={() => setHp(hp + 10)}> Se soigner</button>
    </div>

  )
}

export default HeroHp