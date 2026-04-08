import AdventurerCard from "./AdventureCard";

  
  type Adventurer = {
    id: number;
    name: string;
    role: string;
    rate: number;
    available: boolean;
  };
  
 
  type TavernBoardProps = {
    adventurers: Adventurer[];
  };
  
  function TavernBoard({ adventurers }: TavernBoardProps) {
    if (adventurers.length === 0) {
      return <p className="empty">Aucun aventurier disponible ce soir.</p>;
    }
  
    return (
      <section className="tavern-board">
        {adventurers.map((a) => (
          <AdventurerCard
            key={a.id}         
            name={a.name}
            role={a.role}
            rate={a.rate}
            available={a.available}
          />
        ))}
      </section>
    );
  }
  
export default TavernBoard;