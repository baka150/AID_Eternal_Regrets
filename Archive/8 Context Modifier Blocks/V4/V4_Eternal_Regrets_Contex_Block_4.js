// start JavaScript Code Segment 4 of 6, original lines 31-40 (continued - unbalanced braces)
let currentGirl = parseCurrentGirl(text); // Single declaration here
    if (!state.bondLevel) state.bondLevel = {}; // Prevent undefined bondLevel
    if (state.firstRun) {
      append += '\n[Start in dorm; no encounters until player moves.]'; // Trimmed enforces to essentials, reducing initial bloat
      append += '\n[Day 1: Newly arrived, fresh discoveries.]';
      state.firstRun = false; // Ensure it only runs once
    }
    // ... (rest of context logic, with backstory ties on negatives)
    try {  // Inner try for suitor generation to isolate potential errors
      if (currentGirl !== 'unknown' && !getAutoCard(currentGirl)) {
// end JavaScript Code Segment 4 of 6