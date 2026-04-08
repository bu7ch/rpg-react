

type AdventurerCardProps = {
    name: string;
    role: string;
    rate: number;
    available: boolean;
  };
  
  const ROLE_EMOJI: Record<string, string> = {
    "Éclaireur": "🏹",
    "Soigneuse": "✨",
    "Guerrier":  "⚔️",
    "Archère":   "🎯",
  };

function AdventurerCard({ name, role, rate, available }: AdventurerCardProps) {
    return (
        <article className={`adventurer-card ${available ? '' : 'unavailable'}`}>
        <div className="card-emoji">{ROLE_EMOJI[role] ?? '🧙'}</div>
        <div className="card-name">{name}</div>
        <div className="card-role">{role}</div>
        <div className="card-rate">{rate} po / jour</div>
        <span className={`badge ${available ? 'badge-available' : 'badge-busy'}`}>
          {available ? '✅ Disponible' : '⏳ Occupé'}
        </span>
      </article>
    );
  }

  export default AdventurerCard