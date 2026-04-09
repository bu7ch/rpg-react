

import { DIFF_OPTIONS } from '../hooks/useQuestFilters';
import type { DiffFilter } from '../hooks/useQuestFilters';

type QuestFiltersProps = {
  search:       string;
  diffFilter:   DiffFilter;
  resultCount:  number;
  onSearch:     (s: string)      => void;
  onDiffFilter: (d: DiffFilter)  => void;
  onReset:      ()               => void;
};

function QuestFilters({
  search, diffFilter, resultCount,
  onSearch, onDiffFilter, onReset,
}: QuestFiltersProps) {
  const hasFilter = search !== '' || diffFilter !== 'Tous';

  return (
    <div className="quest-filters">
      <div className="search-row">
        <input
          type="text"
          className="search-input"
          placeholder="🔍 Rechercher une quête..."
          value={search}
          onChange={e => onSearch(e.target.value)}
        />
        {hasFilter && (
          <button className="btn-outline btn-sm" onClick={onReset}>
            ✕ Réinitialiser
          </button>
        )}
      </div>

      <div className="diff-filters">
        {DIFF_OPTIONS.map(opt => (
          <button
            key={opt}
            className={`diff-btn ${diffFilter === opt ? 'active' : ''}`}
            onClick={() => onDiffFilter(opt)}
          >
            {opt}
          </button>
        ))}
      </div>

      {hasFilter && (
        <p className="filter-count">
          {resultCount} quête{resultCount !== 1 ? 's' : ''} trouvée{resultCount !== 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
}

export default QuestFilters;