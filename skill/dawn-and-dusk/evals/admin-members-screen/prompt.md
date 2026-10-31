---
tags: [skill-creator]
max_turns: 40
timeout_seconds: 1200
allowed_tools: [Read, Glob, Grep, Skill, Write, Edit, Bash]
---

Build the "Team members" admin screen for our internal tool in dawn & dusk. App shell with a side nav (Overview, Members, Billing, Settings), a page header with an "Invite member" primary button that opens a dialog with a form (email, role select, optional message), and a dense table of about 12 members: avatar, name + email, role, status (active / invited / suspended), last active, and a row actions menu. Search and a role filter above the table, and row selection for bulk remove. Static HTML using the system's own JS behaviours — no framework.
