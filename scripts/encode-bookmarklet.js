/* eslint-disable */
const fs = require('fs');
const path = require('path');
const { minify } = require('terser');


async function main() {
  try {
    const codePath = path.join(__dirname, '../public/bookmarklet.js');
    const code = fs.readFileSync(codePath, 'utf8');

    console.log('Original length:', code.length);

    // Minify with Terser
    const minifiedResult = await minify(code, {
      compress: {
        dead_code: true,
        drop_debugger: true,
        conditionals: true,
        evaluate: true,
        booleans: true,
        loops: true,
        unused: true,
        hoist_funs: true,
        keep_fargs: false,
        hoist_vars: true,
        if_return: true,
        join_vars: true,
      },
      mangle: {
        toplevel: true,
      },
    });

    if (minifiedResult.error) {
      throw minifiedResult.error;
    }

    const minified = minifiedResult.code;
    const encoded = 'javascript:' + encodeURIComponent(minified);

    console.log('Minified length:', minified.length);
    console.log('Encoded length:', encoded.length);

    const outPath = path.join(__dirname, '../public/bookmarklet.min.txt');
    fs.writeFileSync(outPath, encoded, 'utf8');
    console.log('Saved encoded bookmarklet to:', outPath);
  } catch (error) {
    console.error('Minification failed:', error);
    process.exit(1);
  }
}

main();
