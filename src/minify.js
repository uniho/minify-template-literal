import {walk} from 'astray';
import MagicString from 'magic-string';
import {parse} from 'meriyah';

const SEPARATOR = "\x89sep\x89";

export function minify(code, plugins, opts = {}) {
  const out = new MagicString(code);
  const ast = parse(code, {
    next: true,
    loc: true,
    ranges: true,
    module: true,
  });

  walk(ast, {
    TaggedTemplateExpression(node) {
      const { start, end } = node.loc;

      if (start.line !== end.line || start.column !== end.column) {

        // // for TEST
        // console.log(node)

        let tagName = node.tag?.name;
        if (!tagName) {
          if (node.tag?.type == 'MemberExpression' && node.tag?.property?.name) {
            tagName = node.tag.property.name;
          } else {
            const callee = node.tag?.callee;
            if (!callee) return;
            if (callee.name) {
              tagName = callee.name + '()';
            } else {
              const property = callee.property;
              if (!property) return;
              if (!property.name) return;
              tagName = property.name + '()';
            }
          }
        } 

        // // for TEST
        // console.log(tagName)

        const activePlugins = [];
        plugins.forEach(plugin => {
          if (!plugin.checkTag(tagName, node)) return;
          activePlugins.push(plugin);
        });

        let src = '';
        node.quasi.quasis.forEach((quasi, index) => {
          src += (index == 0 ? '' : SEPARATOR) + quasi.value.raw;
        });

        activePlugins.forEach(plugin => {
          src = plugin.minify(src);
        });

        const srcArr = src.split(SEPARATOR);

        node.quasi.quasis.forEach((quasi, index) => {
          out.overwrite(quasi.start, quasi.end, srcArr[index]);
        });
      }
    },
  });

  return out;
}
