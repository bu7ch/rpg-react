import { useState, useMemo } from 'react';
import type { Quest }         from '../types';
 
export type DiffFilter = 'Tous' | '⭐' | '⭐⭐' | '⭐⭐⭐' | '⭐⭐⭐⭐';
 
export const DIFF_OPTIONS: DiffFilter[] = ['Tous', '⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐'];
 
type UseQuestFiltersReturn = {
  search:       string;
  diffFilter:   DiffFilter;
  filtered:     Quest[];
  setSearch:    (s: string) => void;
  setDiffFilter:(d: DiffFilter) => void;
  reset:        () => void;
};
 
export function useQuestFilters(quests: Quest[]): UseQuestFiltersReturn {
  const [search,     setSearch]     = useState('');
  const [diffFilter, setDiffFilter] = useState<DiffFilter>('Tous');
 
  // useMemo : ne recalcule que si quests, search ou diffFilter changent
  const filtered = useMemo(() => {
    return quests.filter(q => {
      const matchSearch = q.title.toLowerCase().includes(search.toLowerCase()) ||
                          q.content.toLowerCase().includes(search.toLowerCase());
      const matchDiff   = diffFilter === 'Tous' || q.diff === diffFilter;
      return matchSearch && matchDiff;
    });
  }, [quests, search, diffFilter]);
 
  const reset = () => { setSearch(''); setDiffFilter('Tous'); };
 
  return { search, diffFilter, filtered, setSearch, setDiffFilter, reset };
}