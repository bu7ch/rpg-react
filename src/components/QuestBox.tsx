
type QuestBoxProps = {
  title: string;
  rarity?: string;        
  children: React.ReactNode;
};

function QuestBox({ title, rarity, children }: QuestBoxProps) {
  return (
    <div className="quest-box">
      <div className="quest-header">
        <span>📜</span>
        <h3>{title}</h3>
        {rarity && <span className="tag">{rarity}</span>}
      </div>
      <div className="quest-content">
        {children}
      </div>
    </div>
  );
}

export default QuestBox