

import { useState }      from 'react';
import { Link }          from 'react-router';
import { useHeroes }     from '../hooks/useHeroes';
import HeroForm          from '../components/HeroForm';
import { LoadingState, ErrorState, EmptyState } from '../components/StateComponents';
import type { Hero }     from '../types';

const CLASS_EMOJI: Record<string, string> = {
  'Archère': '🏹', 'Paladin': '🛡️',
  'Nécromancienne': '💀', 'Guerrier': '⚔️', 'Druide': '🌿',
};

function HeroesPage() {
  const { heroes, loading, error, refetch, addHero, removeHero } = useHeroes();
  const [showForm,  setShowForm]  = useState(false);
  const [confirmId, setConfirmId] = useState<number | null>(null);

  const handleAdd = async (hero: Omit<Hero, 'id'>) => {
    await addHero(hero);
    setShowForm(false);
  };

  const handleDelete = async (id: number) => {
    await removeHero(id);
    setConfirmId(null);
  };

  if (loading) return <LoadingState message="Chargement des héros..." />;
  if (error)   return <ErrorState  message={error} onRetry={refetch} />;

  return (
    <div className="page heroes-page">
      <div className="page-header">
        <div>
          <h2 className="page-title">⚔️ Roster de la Guilde</h2>
          <p className="page-subtitle">{heroes.length} héros enregistrés</p>
        </div>
        <button
          className={showForm ? 'btn-outline' : 'btn-primary'}
          onClick={() => setShowForm(v => !v)}
        >
          {showForm ? '✕ Annuler' : '＋ Nouveau héros'}
        </button>
      </div>

      {showForm && (
        <HeroForm
          onSubmit={handleAdd}
          onCancel={() => setShowForm(false)}
        />
      )}

      {heroes.length === 0 ? (
        <EmptyState
          emoji="⚔️"
          title="Aucun héros dans la guilde"
          subtitle='Cliquez sur "Nouveau héros" pour commencer.'
        />
      ) : (
        <section className="hero-list">
          {heroes.map(hero => (
            <div key={hero.id} className="hero-card-wrapper">
              <Link
                to={`/heroes/${hero.id}`}
                className={`hero-card ${hero.isAlive ? 'alive' : 'dead'}`}
                style={{
                  opacity:         hero.isAlive ? 1 : 0.45,
                  filter:          hero.isAlive ? 'none' : 'grayscale(80%)',
                  textDecoration:  'none',
                }}
              >
                <div className="hero-avatar">{CLASS_EMOJI[hero.classe] ?? '🧙'}</div>
                <div className="hero-info">
                  <h2 className="hero-name">{hero.name}</h2>
                  <p className="hero-class">{hero.classe}</p>
                  <p className="hero-level">Niveau {hero.level}</p>
                  <p className="hero-hp">❤️ {hero.hp} PV</p>
                </div>
                <span className={`status-badge ${hero.isAlive ? 'badge-alive' : 'badge-dead'}`}>
                  {hero.isAlive ? '✅' : '💀'}
                </span>
              </Link>
              <button
                className="btn-delete-hero"
                onClick={() => setConfirmId(hero.id)}
                title="Supprimer ce héros"
              >
                🗑️
              </button>
            </div>
          ))}
        </section>
      )}

      {confirmId !== null && (
        <div className="modal-overlay" onClick={() => setConfirmId(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <p className="modal-title">⚠️ Supprimer ce héros ?</p>
            <p className="modal-sub">Cette action est irréversible.</p>
            <div className="modal-actions">
              <button className="btn-danger" onClick={() => handleDelete(confirmId)}>
                Supprimer
              </button>
              <button className="btn-outline" onClick={() => setConfirmId(null)}>
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HeroesPage;