# POD Art House — Website Changelog
**landingpodcdmx.vercel.app**

© 2026 POD Art House. All rights reserved.
Av. Nuevo León 108, Colonia Condesa, Ciudad de México.
Built by HOG — neto@swells.mx

---

## Version 1.3 — June 16, 2026

**Events & RSVP**
- Events section now works as a horizontal carousel on mobile — swipe to browse
- Tapping or clicking an event photo now opens the RSVP form directly
- RSVP form collects: name, email, phone number, and Instagram handle
- Each RSVP is automatically linked to the specific event in Airtable
- Exhibition RSVP removed — all reservations now go through individual event cards

**Access Cards**
- Download your access card as a high-resolution PNG (4×)
- Cards are saved to your personal gallery and persist between sessions

**Backend**
- All RSVP data flows directly into Airtable → HOG - Marketing OPS → PR Data Base
- Guest records are linked to their event via the EVENTS field

---

## Version 1.2 — June 15, 2026

**Exhibition**
- Updated exhibition: *La Pelota No Se Mancha* — FUTBOLITIS × POD Art House
- Curated by Ezequiel Suranyi · 18 artists · Jun 5 – Jul 29, 2026
- Full press brief copy live on the site

**Design**
- POD Art House logo added to footer
- Link previews (WhatsApp, iMessage, etc.) now show exhibition title and description

**RSVP fields**
- Added phone number field to RSVP form
- Instagram handle now maps to Company/Organization/handle in Airtable

---

## Version 1.1 — June 14, 2026

**Backend infrastructure**
- Airtable → Supabase sync: publishing an event in Airtable makes it appear live on the site
- ONLINE? checkbox controls visibility — check to publish, uncheck to remove
- Event images synced automatically from Airtable to permanent storage
- RSVP submissions create records in Airtable PR Data Base in real time

**Access Cards**
- Collectible digital access cards generated on RSVP
- Save to personal gallery (persists in browser)
- Download as PNG

---

## Version 1.0 — June 6, 2026

- Initial launch
- *La Pelota No Se Mancha* exhibition hero
- What's On events section
- RSVP flow with access card generation
- My Gallery
