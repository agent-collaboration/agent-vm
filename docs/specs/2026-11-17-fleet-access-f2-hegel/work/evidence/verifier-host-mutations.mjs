import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync, execFileSync } from 'node:child_process';

// Run only in a separate, disposable public checkout: source/build mutations are intentional.
const revision = '829651c7df1f686a53abf5ca4292f46568a84bce';
const evidence = resolve(process.argv[2]);
const actualHead = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
if (actualHead !== revision) throw new Error(`Wrong target: ${actualHead}`);
if (execFileSync('git', ['status', '--porcelain'], { encoding: 'utf8' }).trim() !== '') throw new Error('Source must start clean');
mkdirSync(evidence, { recursive: true });
const records = [];
function command(label, args, expected) {
  const outcome = spawnSync('pnpm', args, { encoding: 'utf8', env: { ...process.env, CI: '1', NO_COLOR: '1' }, timeout: 1200000, maxBuffer: 64000000 });
  writeFileSync(`${evidence}/${label}.log`, outcome.stdout + outcome.stderr);
  const receipt = { label, revision, cwd: process.cwd(), command: ['pnpm', ...args], exit: outcome.status, signal: outcome.signal, error: outcome.error?.message };
  records.push(receipt);
  writeFileSync(`${evidence}/commands.json`, JSON.stringify(records, null, 2));
  console.log(`${label} exit=${outcome.status}`);
  if (outcome.status !== expected) throw new Error(`Unexpected exit for ${label}; inspect preserved raw evidence`);
}
function test(label, file, property, expected) {
  command(label, ['exec', 'vitest', 'run', '--project', 'e2e-host', file, '--testNamePattern', property, '--maxWorkers', '1', '--reporter=default', '--reporter=json', `--outputFile.json=${evidence}/${label}.json`], expected);
}
const rows = [
  {
    id: 'M4-DO-admission',
    source: 'packages/tool-host-core/src/workspace-authority/workspace-authority.ts',
    file: 'packages/tool-host-cloudflare/src/durable-workspace-authority/agent-removal.hegel.host.e2e.test.ts',
    property: 'M4 keeps admission, unlink/disable, idempotency and conflicts through real Durable Object transactions',
    before: "if (removal.kind === 'pending' || removal.operation === 'disable')",
    after: "if (false && (removal.kind === 'pending' || removal.operation === 'disable'))",
    rebuild: true,
  },
  {
    id: 'M5-UDS-abort-slot',
    source: 'packages/agent-portal-sdk/src/gateway-runtime-client/node-gateway-runtime-transport.ts',
    file: 'packages/agent-portal-sdk/src/gateway-runtime-client/node-gateway-runtime-transport.hegel.host.e2e.test.ts',
    property: 'M5 models request, abort, late reply and close over a Unix socket',
    before: "options.signal?.removeEventListener('abort', onAbort);\n\t\t\t\tthis.#pendingRequests.delete(requestId);\n\t\t\t\treject(error);",
    after: "options.signal?.removeEventListener('abort', onAbort);\n\t\t\t\tif (!options.signal?.aborted) this.#pendingRequests.delete(requestId);\n\t\t\t\treject(error);",
    rebuild: false,
  },
];
for (const row of rows) {
  const original = readFileSync(row.source, 'utf8');
  if (original.split(row.before).length !== 2) throw new Error(`Nonunique mutation anchor: ${row.id}`);
  writeFileSync(`${evidence}/${row.id}-mutation.json`, JSON.stringify({ ...row, revision, originalSha256: createHash('sha256').update(original).digest('hex') }, null, 2));
  test(`${row.id}-baseline`, row.file, row.property, 0);
  try {
    writeFileSync(row.source, original.replace(row.before, row.after));
    if (row.rebuild) command(`${row.id}-mutant-build`, ['--filter', '@agent-collaboration/tool-host-core', 'build'], 0);
    test(`${row.id}-red`, row.file, row.property, 1);
    test(`${row.id}-red-repeat`, row.file, row.property, 1);
  } finally {
    writeFileSync(row.source, original);
    if (row.rebuild) command(`${row.id}-restored-build`, ['--filter', '@agent-collaboration/tool-host-core', 'build'], 0);
  }
  test(`${row.id}-restored`, row.file, row.property, 0);
  if (createHash('sha256').update(readFileSync(row.source)).digest('hex') !== createHash('sha256').update(original).digest('hex')) throw new Error(`Source not restored: ${row.id}`);
}
writeFileSync(`${evidence}/final-source-status.txt`, execFileSync('git', ['status', '--porcelain'], { encoding: 'utf8' }));
