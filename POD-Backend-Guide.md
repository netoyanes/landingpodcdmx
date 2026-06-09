# POD Art House — Backend Operations Guide
**For POD Team Managers · HOG Infrastructure**

---

## How the system works

The website at `landingpodcdmx.vercel.app` is fully connected to your Airtable base **HOG - Marketing OPS**. You don't need to touch any code. Everything you manage in Airtable reflects live on the site within seconds.

There are two flows:

| Direction | What happens |
|---|---|
| **Airtable → Website** | You publish an event in Airtable → it appears live on the site |
| **Website → Airtable** | A visitor RSVPs → a new contact lands in PR Data Base |

---

## Managing events (What's On section)

All events are managed in the **EVENTS** table inside HOG - Marketing OPS.

**To publish an event on the website:**

1. Open the **EVENTS** table
2. Find the event row (or create a new one)
3. Fill in the required fields:
   - **Name** — event title
   - **Date** — pick a date
   - **Day** — select the day of week (Mon, Tue…)
   - **Time** — select the time slot
   - **Type** — Workshop / Music / Community / Dinner / etc.
   - **COPY IN - DESCRIPTION** — the event description shown on the card
   - **PICTURE (4:5)** — attach the event image (portrait ratio works best)
4. Check the **ONLINE?** checkbox ✓

That's it. The Airtable automation fires, syncs the record to the database, and the event appears live on the site. Unchecking **ONLINE?** removes it from the site.

**To take an event offline:** uncheck **ONLINE?** — it disappears from the site immediately on next load.

---

## Reading RSVPs (PR Data Base)

Every time someone fills the RSVP form on the site, a new record is created automatically in the **PR Data Base** table. You'll see:

| Field | What it contains |
|---|---|
| **Name** | Guest's name |
| **Email** | Guest's email |
| **Phone Number** | Guest's phone (if provided) |
| **Company/Organization/handle** | Their Instagram handle |
| **Brand/Event Name** | Which exhibition or event they RSVPd to |
| **EVENTS** | Linked directly to the event record |
| **Notes** | Whether it was an Exhibition or Event RSVP |
| **Created** | Timestamp of the submission |

Use the **Arrived** checkbox on the day of the event to mark who showed up.

---

## A note on infrastructure — from HOG

We are moving all POD operations into Airtable, and we recommend the full team does the same.

**Why Airtable is your operating system going forward:**

- It replaces spreadsheets, form tools, CRM inboxes, and content calendars in one place
- It connects directly to your live website — no developer needed to update content
- It gives you visual dashboards, kanban boards, gallery views, and calendar views out of the box
- It scales: one base can run events, RSVPs, press contacts, assets, and revenue tracking simultaneously
- Every HOG client app that requires a visual database or dashboard will be built on this stack

**All future HOG infrastructure** — landing pages, booking systems, CRM flows, campaign dashboards — will be built with Airtable as the data layer. Your team will receive access to the relevant bases as each project launches.

To get access to **HOG - Marketing OPS**, contact your HOG account manager. You will be added as a collaborator with the appropriate permission level (Editor for operations, Creator for managers).

---

## Quick reference

| Task | Where |
|---|---|
| Publish a new event | EVENTS table → fill fields → check ONLINE? |
| Remove an event from site | EVENTS table → uncheck ONLINE? |
| See who RSVPd | PR Data Base table |
| Mark a guest as arrived | PR Data Base → Arrived checkbox |
| Update exhibition dates or copy | Contact HOG — we'll update the site |
| Add a new page or feature | Contact HOG |

---

*Built by HOG · All infrastructure questions: neto@swells.mx*
