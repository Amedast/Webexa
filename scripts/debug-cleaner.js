const fs = require('fs');
const path = require('path');
const code = fs.readFileSync(path.join(__dirname, '../public/bookmarklet.js'), 'utf8');

let i = 0;
let state = 'NORMAL';
let currentLine = 1;
let stateStartLine = 1;

while (i < code.length) {
  const char = code[i];
  const next = code[i + 1] || '';
  
  if (char === '\n') {
    currentLine++;
  }

  const prevState = state;

  // Transition logic
  if (state === 'NORMAL') {
    if (char === '/' && next === '/') {
      state = 'SINGLE_COMMENT';
      i += 2;
      continue;
    } else if (char === '/' && next === '*') {
      state = 'MULTI_COMMENT';
      i += 2;
      continue;
    } else if (char === "'") {
      state = 'STR_SINGLE';
      stateStartLine = currentLine;
    } else if (char === '"') {
      state = 'STR_DOUBLE';
      stateStartLine = currentLine;
    } else if (char === '`') {
      state = 'STR_TEMPLATE';
      stateStartLine = currentLine;
    }
  } else if (state === 'SINGLE_COMMENT') {
    if (char === '\n' || char === '\r') {
      state = 'NORMAL';
    }
  } else if (state === 'MULTI_COMMENT') {
    if (char === '*' && next === '/') {
      state = 'NORMAL';
      i += 2;
      continue;
    }
  } else if (state === 'STR_SINGLE') {
    if (char === '\\') {
      i += 2;
      continue;
    } else if (char === "'") {
      state = 'NORMAL';
    }
  } else if (state === 'STR_DOUBLE') {
    if (char === '\\') {
      i += 2;
      continue;
    } else if (char === '"') {
      state = 'NORMAL';
    }
  } else if (state === 'STR_TEMPLATE') {
    if (char === '\\') {
      i += 2;
      continue;
    } else if (char === '`') {
      state = 'NORMAL';
    }
  }
  
  // If we are in single or double quotes and we span multiple lines, print it!
  if ((state === 'STR_SINGLE' || state === 'STR_DOUBLE') && currentLine > stateStartLine) {
    console.log(`Warning: State ${state} started at line ${stateStartLine} but is still active at line ${currentLine} (char ${JSON.stringify(char)})`);
    // Print some surrounding context to see what happened
    const startIndex = Math.max(0, i - 100);
    const endIndex = Math.min(code.length, i + 100);
    console.log(`Context: ${JSON.stringify(code.substring(startIndex, endIndex))}`);
    break;
  }
  
  i++;
}

console.log('Final state:', state);
