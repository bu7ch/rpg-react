

import { useState }          from 'react';
import QuestBox              from './QuestBox';
import QuestFilters          from './QuestFilters';
import { useGuild }          from '../context/GuildContext';
import { useQuests }         from '../hooks/useQuests';
import { useQuestFilters }   from '../hooks/useQuestFilters';
import { LoadingState, ErrorState, EmptyState } from './StateComponents';
import type { Quest }        from '../types';

function QuestBoard() {
  const { currentHeroId, activeQuest, takeQuest } = useGuild();
  const { quests, loading, error, refetch }        = useQuests();
  const { search, diffFilter, filtered, setSearch, setDiffFilter, reset } = useQuestFilters(quests);
  const [formError, setFormError] = useState<string | null>(null);

  const handleTake = (quest: Quest) => {
    if (!currentHeroId) {
      setFormError('Sélectionne un héros avant de prendre une quête.');
      setTimeout(() => setFormError(null), 3000);
      return;
    }
    if (activeQuest) {
      setFormError('Une mission est déjà en cours.');
      setTimeout(() => setFormError(null), 3000);
      return;
    }
    takeQuest(quest);
    setFormError(null);
  };

  if (loading) return <LoadingState message="Chargement des quêtes..." />;
  if (error)   return <ErrorState  message={error} onRetry={refetch} />;

  return (
    <div className="quest-board">
      <QuestFilters
        search={search}
        diffFilter={diffFilter}
        resultCount={filtered.length}
        onSearch={setSearch}
        onDiffFilter={setDiffFilter}
        onReset={reset}
      />

      {formError && <div className="error-msg">⚠️ {formError}</div>}

      {filtered.length === 0 ? (
        quests.length === 0
          ? <EmptyState emoji="🏆" title="Toutes les quêtes complétées !" subtitle="Revenez plus tard." />
          : <EmptyState emoji="🔍" title="Aucun résultat" subtitle="Essaie avec d'autres termes ou filtres." />
      ) : (
        filtered.map(quest => (
          <QuestBox key={quest.id} title={quest.title} rarity={quest.rarity}>
            <p>{quest.content}</p>
            <div className="quest-footer">
              <div className="quest-rewards">
                <span className="reward">💰 {quest.reward}</span>
                <span className="diff">{quest.diff}</span>
                <span className="xp-pill">+{quest.xp} XP</span>
              </div>
              <button
                className="btn-take"
                onClick={() => handleTake(quest)}
                disabled={!!activeQuest}
              >
                ⚔️ Prendre la quête
              </button>
            </div>
          </QuestBox>
        ))
      )}
    </div>
  );
}

export default QuestBoard;