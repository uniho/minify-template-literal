import remapping from '@ampproject/remapping';

export const remap = (out, source, file, map) => remapping(
  [
    {
      ...out.generateDecodedMap({
        source, file, hires: true,
      }),
      version: 3,
    },
    map,
  ],

  // don't load other source maps; referenced files are the original source
  () => null,
);
