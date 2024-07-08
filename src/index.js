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
  const out = minify(src, plugins);

  if (!output) {
    console.log(out.toString());
    console.error('done!');
    process.exit(0);
  }

  await writeFile(output, out.toString(), 'utf8');

  if (args.values.remap) {
    const mapfile = input + '.map';
    const src = await readFile(mapfile, 'utf8');
    const map = remap(out, input, mapfile, src);
    await writeFile(mapfile, map.toString(), 'utf8');
  }

  console.error('done!');

} catch(e) {
  console.error(e.message);
  process.exit(1);
}
