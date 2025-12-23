// start block 3/4
  try {
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
        Internal.generateCard({title: currentGirl});
      }
    } catch (e) {
      console.log('Suitor integration error: ' + e.message); // Debug log
    }
    // ... (rest of context logic, with backstory ties on negatives)
    state.memory.context = (state.memory.context || context.slice(0, info.memoryLength)) + append;
    return {text: state.memory.context + context.slice(info.memoryLength), stop};
  } catch (e) {
    append += ' [Error: ' + e + ']';
    return {text: append, stop};
  }
// end block 3/4
