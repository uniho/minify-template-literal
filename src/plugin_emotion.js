
export default options => ({
  name: 'emotion',
  checkTag: (tag, node) => (tag == 'css' || tag == 'keyframes' || tag == 'styled()'),
  minify: src => src
    // remove comments
    .replace(/(\/\*!.*?\*\/|\"(?:(?!(?<!\\)\").)*\"|\'(?:(?!(?<!\\)\').)*\')|\/\*[\s\S]*?\*\/|\/\/.*/g, '$1')

    // reduce whitespace to a single space
    .replace(/(\/\*!.*?\*\/|\"(?:(?!(?<!\\)\").)*\"|\'(?:(?!(?<!\\)\').)*\')\s*|\s+/g, '$1 ')

    // Remove leading and trailing whitespace
    .trim()
});