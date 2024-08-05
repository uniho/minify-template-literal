
export default options => ({
  name: 'jsx',
  checkTag: (tag, node) => (tag == 'html'),
  minify: src => {
    const regexp = /<(?:pre|textarea)(?: [^>]+)?>([\s\S]+?)<\/(?:pre|textarea)>/g;
    let start = 0, end = 0;
    let dst = '';
    while (1) {
      const m = regexp.exec(src);
      if (m) {
        end = m.index;
      } else {
        end = src.length;
      }

      const s = src.slice(start, end)
        // Remove comments
        .replace(/<!--(?![<>\[\]])[\s\S]*?(?<![<>\[\]])-->/g, '')

        // Remove spaces after newline characters.
        .replace(/\r?\n\s*(\S)/g, ' $1')

        // Remove leading and trailing whitespace
        .trim()

      dst += s;

      if (!m) break;

      dst += m[0];
      start = end + m[0].length;
    }

    return dst;
  },
});
