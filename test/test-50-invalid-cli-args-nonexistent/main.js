#!/usr/bin/env node

'use strict';

const assert = require('assert');
const utils = require('../utils.js');

assert(!module.parent);
assert(__dirname === process.cwd());

const target = process.argv[2] || 'host';
const standard = 'stdout';

let right;

const inspect = (standard === 'stdout')
  ? [ 'inherit', 'pipe', 'inherit' ]
  : [ 'inherit', 'inherit', 'pipe' ];

right = utils.pkg.sync([
  '--target', target,
  '--output', 'no-output', '12345'
], { stdio: inspect, expect: 2 });

assert(right.indexOf('\x1B\x5B') < 0, 'colors detected');
assert(right.indexOf('Error!') >= 0);
assert(right.indexOf('12345') >= 0);
assert(right.indexOf('not exist') >= 0);
