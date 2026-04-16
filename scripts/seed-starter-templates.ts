/**
 * CLI to seed starter templates for a workspace.
 * Usage: npx tsx scripts/seed-starter-templates.ts <workspaceId> <memberId>
 * (memberId = workspace_members.id for the owner)
 */
import { seedStarterTemplatesForWorkspace } from '../lib/templates/seed-starter-templates';

const workspaceId = process.argv[2];
const memberId = process.argv[3];

if (!workspaceId || !memberId) {
  console.error('Usage: npx tsx scripts/seed-starter-templates.ts <workspaceId> <memberId>');
  process.exit(1);
}

seedStarterTemplatesForWorkspace({ workspaceId, createdByMemberId: memberId })
  .then(({ seeded }) => {
    console.log(`Seeded ${seeded} starter templates for workspace ${workspaceId}`);
    process.exit(0);
  })
  .catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
  });
