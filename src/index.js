#!/usr/bin/env node

import {parseArgs} from "node:util";
import {minify} from './minify.js';
import {remap} from './remap.js';
import {writeFile, readFile} from 'node:fs/promises';

import emotion from './plugin_emotion.js';
import jsx from './plugin_jsx.js';

try {
  const args = parseArgs({
    options: {
      outfile: {
        type: "string",
        default: "",
      },
      remap: {
        type: "boolean",
        default: false,
      },
    },
    allowPositionals: true,
  });

  const input = args.positionals[0];
  if (!input) {
    console.error('Usage: <in file name> [--outfile=<out file name>] [--remap]');
    process.exit(1);
  }

  const output = args.values.outfile;
  const src = await readFile(input, 'utf8');

  const plugins = [emotion(), jsx()];

  const opts = {};
  if (args.values.remap) {
    opts.mapfile = input + '.map';
    opts.sourcemap =  await readFile(opts.mapfile, 'utf8');
  }

  const out = await minify(src, plugins, opts);

  if (!output) {
    console.log(out.toString());
    console.error('done!');
    process.exit(0);
  }

  await writeFile(output, out.toString(), 'utf8');

  if (args.values.remap) {
    const map = remap(out, input, opts.mapfile, opts.sourcemap);
    await writeFile(opts.mapfile, map.toString(), 'utf8');
  }

  console.error('done!');

} catch(e) {
  console.error(e.message);
  process.exit(1);
}
