# Teamfoto's — De Flexschilder

André levert zelf de foto's van zijn vakmensen aan (eigen fotoshoot, geen
AI-beeld). Hier vallen ze 1-op-1 in — twee stappen, geen codewijziging in de
componenten nodig:

1. **Drop het bestand hier** met de slug als naam (jpg of webp, staand ~4:5,
   min. ~800 px breed):
   - `tieme.jpg`
   - `joryd.jpg`
   - `jermaine.jpg`
   - `julia.jpg`

2. **Zet het pad in `lib/team.js`** bij het juiste lid:
   `foto: '/img/team/tieme.jpg'` (nu `foto: null`).

Klaar. De teamsectie én het verhaal-blok op `/over-ons` tonen dan automatisch de
echte foto in plaats van de "Foto volgt"-placeholder, en het Person-schema
(E-E-A-T) pakt de afbeelding mee.

> Slug moet exact matchen met het `slug`-veld in `lib/team.js`. Voeg je een lid
> toe? Nieuwe entry in `lib/team.js` + bestand hier met diezelfde slug.
