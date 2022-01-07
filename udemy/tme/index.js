#!/usr/bin/env node

// implementation plan: 
// file collection (all files with test.js)
// test environment setup
// test file execution
// report results

import Runner from './runner.js';
const runner = new Runner();

const run = async () => {
  await runner.collectFiles(process.cwd());
  runner.runTests();
}

run();