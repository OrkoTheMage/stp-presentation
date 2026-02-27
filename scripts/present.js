#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import chalk from 'chalk';
import readline from 'readline';
import pkg from 'enquirer';
const { Select } = pkg;

const cwd = process.cwd();
const srcDir = path.join(cwd, 'src');

function findPresentations() {
  if (!fs.existsSync(srcDir)) return [];
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  const candidates = [];

  const rootIndex = path.join(srcDir, 'index.js');
  if (fs.existsSync(rootIndex)) candidates.push({ name: 'src (root)', file: rootIndex });

  for (const ent of entries) {
    if (!ent.isDirectory()) continue;
    const idx = path.join(srcDir, ent.name, 'index.js');
    if (fs.existsSync(idx)) candidates.push({ name: ent.name, file: idx });
  }
  return candidates;
}

async function main() {
  const presentations = findPresentations();
  if (presentations.length === 0) {
    console.error('No presentation `index.js` files found under `src` or its immediate subfolders.');
    process.exit(1);
  }

  // Non-interactive listing for CI / testing
  if (process.argv.includes('--list') || process.argv.includes('-l')) {
    const out = presentations.map(p => ({ name: p.name, file: path.relative(cwd, p.file) }));
    console.log(JSON.stringify(out, null, 2));
    process.exit(0);
  }

  // If running in a TTY, show an interactive Select that supports tab/arrow navigation
  if (process.stdin.isTTY) {
    const choices = presentations.map((p, i) => ({ name: String(i), message: `${i + 1}) ${p.name} — ${path.relative(cwd, p.file)}` }));
    const prompt = new Select({
      name: 'presentation',
      message: 'Choose a system (use Tab / ↑ ↓ to navigate, Enter to select):',
      choices
    });

    let choiceIndex;
    try {
      const answer = await prompt.run();
      choiceIndex = Number(answer);
    } catch (err) {
      process.exit(2);
    }

    const chosen = presentations[choiceIndex];
    console.log(chalk.green(`\nRunning ${chosen.name} → ${path.relative(cwd, chosen.file)}\n`));
    const child = spawn(process.execPath, [chosen.file, ...process.argv.slice(2)], { stdio: 'inherit' });
    child.on('exit', (code, signal) => {
      if (signal) process.kill(process.pid, signal);
      process.exit(code ?? 0);
    });
    return;
  }

  // Fallback for non-TTY: numbered list input
  console.log('\nAvailable systems:');
  presentations.forEach((p, i) => {
    console.log(`${i + 1}) ${p.name} — ${path.relative(cwd, p.file)}`);
  });

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const question = (q) => new Promise((res) => rl.question(q, res));

  let answer;
  try {
    answer = await question('\nSelect system number (or q to quit): ');
  } catch (err) {
    rl.close();
    process.exit(2);
  }

  if (!answer || answer.trim().toLowerCase() === 'q') {
    rl.close();
    process.exit(0);
  }

  const n = Number(answer.trim());
  if (!Number.isInteger(n) || n < 1 || n > presentations.length) {
    console.error('Invalid selection.');
    rl.close();
    process.exit(2);
  }

  const chosen = presentations[n - 1];
  console.log(chalk.green(`\nRunning ${chosen.name} → ${path.relative(cwd, chosen.file)}\n`));

  const child = spawn(process.execPath, [chosen.file, ...process.argv.slice(2)], { stdio: 'inherit' });
  child.on('exit', (code, signal) => {
    rl.close();
    if (signal) process.kill(process.pid, signal);
    process.exit(code ?? 0);
  });
}

main();
