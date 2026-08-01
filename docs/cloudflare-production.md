# Advanced Culinary Cloudflare production

The production application is one Cloudflare Worker serving the existing student field manual, the protected Teacher Command Center, and the shared API. D1 is the authoritative operational record.

## One-time deployment

1. Authenticate Wrangler in the same environment that will run the deployment.
2. Create the database: `npx wrangler d1 create gcsd-advanced-culinary`
3. Replace `REPLACE_WITH_D1_DATABASE_ID` in `wrangler.jsonc` with the returned database ID.
4. Apply the migration: `npx wrangler d1 migrations apply gcsd-advanced-culinary --remote`
5. Set the initial administrator without committing an email address: `npx wrangler secret put BOOTSTRAP_ADMIN_EMAIL`
6. Deploy: `npx wrangler deploy`
7. In Cloudflare Zero Trust, create Access applications for the deployed hostname:
   - `/teacher/*`: allow only the three approved culinary teachers.
   - `/api/*`: allow approved GCSD district accounts used by the pilot.
8. Verify that the Access identity header reaches the Worker. Never implement a client-supplied identity header.

The secret identifies the first administrator without publishing that address in source control. After sign-in, use **Access & rosters** to add the other teachers and pilot students with their exact district emails and section assignments.

## Required production checks

- An unauthenticated API request is denied.
- An unassigned district account is denied.
- McCann can open `/teacher/` and add approved accounts.
- An Event Order draft is not returned by the student endpoint.
- Publishing creates a visible versioned student order.
- A student receives only tasks for the assigned section.
- A student cannot update another section's task.
- A collaborator can edit planning but cannot publish the owner's controlling revision.
- A student update appears in the teacher Live Production view.
- A stale teacher save receives a revision conflict instead of overwriting newer work.

## Hosting boundary

The GitHub Pages version remains the static public field manual and hides live operational controls. Shared Event Orders and the Teacher Command Center run only on the Cloudflare hostname.
