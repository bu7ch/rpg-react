import { CLASSES, useHeroForm } from "../hooks/useHeroForm";
import type { Hero } from "../types"

type HeroFormProps = {
    onSubmit:(hero:Omit<Hero,'id'>) => Promise<void>;
    onCancel:()=>void;
}
function HeroForm({onSubmit, onCancel}: HeroFormProps) {
     const { form, errors, isValid, isSubmitting, handleChange, handleSubmit } = useHeroForm();

  return (
    <form
    onSubmit={e => {e.preventDefault();handleSubmit(onSubmit)}}
    noValidate
    >
      <h3 className="form-title">📜 Nouveau Héros</h3>
        <div className="field">
        <label className="field-label" htmlFor="name">
          Nom du héros <span className="required">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="Ex : Aragorn"
          className={errors.name ? 'input-error' : ''}
          maxLength={20}
        />
        {errors.name
          ? <span className="field-error">{errors.name}</span>
          : <span className="field-hint">{form.name.trim().length} / 20 caractères</span>
        }
      </div>
      <div className="field">
        <label className="field-label" htmlFor="classe">Classe</label>
        <select id="classe" name="classe" value={form.classe} onChange={handleChange}>
          {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div className="field">
        <label className="field-label" htmlFor="level">
          Niveau — <strong>{form.level}</strong>
        </label>
        <input
          id="level"
          name="level"
          type="range"
          min={1} max={99}
          value={form.level}
          onChange={handleChange}
          className="range-input"
        />
        {errors.level && <span className="field-error">{errors.level}</span>}
      </div>
 
      <div className="field">
        <label className="field-label" htmlFor="hp">
          Points de vie — <strong>{form.hp}</strong>
        </label>
        <input
          id="hp"
          name="hp"
          type="range"
          min={1} max={200}
          value={form.hp}
          onChange={handleChange}
          className="range-input"
        />
        {errors.hp && <span className="field-error">{errors.hp}</span>}
      </div>
 
      <div className="field field-checkbox">
        <input
          id="isAlive"
          name="isAlive"
          type="checkbox"
          checked={form.isAlive}
          onChange={handleChange}
        />
        <label htmlFor="isAlive">Héros vivant</label>
      </div>
 
      <div className="form-preview">
        <span className="preview-label">Aperçu :</span>
        <span className="preview-name">{form.name.trim() || '—'}</span>
        <span className="preview-meta">{form.classe} · Niv.{form.level} · {form.hp} PV</span>
        <span className={`status-badge ${form.isAlive ? 'badge-alive' : 'badge-dead'}`}>
          {form.isAlive ? '✅ En vie' : '💀 Mort'}
        </span>
      </div>
 
      {/* Actions */}
      <div className="form-actions">
        <button
          type="submit"
          className="btn-primary"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? 'Création...' : '⚔️ Créer le héros'}
        </button>
        <button type="button" className="btn-outline" onClick={onCancel}>
          Annuler
        </button>
      </div>
    </form>
  )
}

export default HeroForm