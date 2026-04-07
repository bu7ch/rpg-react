# ⚔️ La Taverne des Aventuriers
### Exercice de validation — Jour 1 React
**Durée estimée : 20 minutes · Individuel**

---

## Contexte

La guilde a besoin d'un panneau d'affichage pour la taverne. Il doit lister les aventuriers disponibles ce soir, avec leur spécialité et leur tarif journalier.

Chaque fiche doit être **identique en structure** mais **différente en contenu** — c'est exactement le problème que les composants React résolvent.

---

## Données de départ

Copie ce tableau dans ton fichier `App.jsx` :

```js
const adventurers = [
  { id: 1, name: "Kael",   role: "Éclaireur", rate: 30,  available: true  },
  { id: 2, name: "Mira",   role: "Soigneuse", rate: 50,  available: true  },
  { id: 3, name: "Drogan", role: "Guerrier",  rate: 40,  available: false },
  { id: 4, name: "Sylva",  role: "Archère",   rate: 35,  available: true  },
];
```

---

## Consignes

### Étape 1 — Composant `AdventurerCard`

Crée un composant `AdventurerCard` qui reçoit les props suivantes :

| Prop | Type | Description |
|------|------|-------------|
| `name` | `string` | Nom de l'aventurier |
| `role` | `string` | Spécialité (Éclaireur, Soigneuse…) |
| `rate` | `number` | Tarif en pièces d'or par jour |
| `available` | `boolean` | Disponible ou non ce soir |

Le composant doit afficher :
- Le nom et le rôle de l'aventurier
- Le tarif sous la forme `30 po / jour`
- Un badge **Disponible** (vert) ou **Occupé** (gris) selon la valeur de `available`
- Si l'aventurier est **indisponible**, la carte doit être visuellement atténuée (opacité réduite ou filtre grisé)

---

### Étape 2 — Composant `TavernBoard`

Crée un composant `TavernBoard` qui :
- Reçoit le tableau `adventurers` en prop
- Parcourt le tableau avec `.map()` et affiche une `AdventurerCard` par aventurier
- Affiche le message suivant si le tableau est vide :

```
Aucun aventurier disponible ce soir.
```

> N'oublie pas la prop `key` sur chaque élément du `.map()`.

---

### Étape 3 — Composant `TavernHeader` avec `children`

Crée un composant `TavernHeader` qui :
- Reçoit une prop `title` (le nom de la taverne)
- Affiche `children` en dessous du titre

Utilise-le dans `App` de cette façon :

```jsx
<TavernHeader title="La Taverne du Dragon Ivre">
  <p>Aventuriers disponibles ce soir — tarifs négociables.</p>
</TavernHeader>
```

---

### Étape 4 — Assembler dans `App`

Dans le composant racine `App`, assemble les trois composants :

```jsx
export default function App() {
  return (
    <div>
      <TavernHeader title="La Taverne du Dragon Ivre">
        <p>Aventuriers disponibles ce soir — tarifs négociables.</p>
      </TavernHeader>
      <TavernBoard adventurers={adventurers} />
    </div>
  );
}
```

---

## Bonus

Ajoute un bouton **"Disponibles uniquement"** dans `TavernBoard`.

Au clic, il ne doit afficher que les aventuriers dont `available` est `true`.

> Contrainte : le `useState` n'a pas encore été vu. Réfléchis à ce qu'il se passe sans lui — et note ce que tu ne peux pas faire. C'est volontaire.

---

## Critères de réussite

- [ ] `AdventurerCard` utilise bien les props (pas de données en dur à l'intérieur)
- [ ] Le `.map()` a une `key` basée sur `id`, pas sur l'index
- [ ] Le cas "liste vide" est géré dans `TavernBoard`
- [ ] `TavernHeader` affiche bien `children` sans en connaître le contenu à l'avance

---
