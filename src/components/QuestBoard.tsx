import QuestBox from "./QuestBox"


function QuestBoard() {
  return (
    <>
        <QuestBox title="Quête Principale" rarity="Épique">
        <p>Détruire l'Anneau Unique dans les feux du Mont Doom.</p>
        <span className="reward">💰 1 000 XP</span>
      </QuestBox>

      <QuestBox title="Quête Secondaire">
        <p>Escorter le marchand jusqu'à Bree.</p>
      </QuestBox>
    
    </>
  )
}

export default QuestBoard