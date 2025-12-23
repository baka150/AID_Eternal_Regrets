// start block 3/4
  try {
    let currentGirl = parseCurrentGirl(text); // Single declaration here
    if (!state.bondLevel) state.bondLevel = {}; // Prevent undefined bondLevel
    if (state.firstRun) {
      append += '\n[Start strictly in dorm after opening; no club/classes until period advances.]';
      append += '\n[This is Day 1 at the academy; no prior events/knowledge—player is newly arrived, discovering everything fresh.]';
      append += '\n[Enforce: Day 1 starts in dorm solitude—no suitor encounters until player initiates movement or period advances; redirect any early triggers to later public periods like hallway or class.]';
      state.firstRun = false;
    }
    state.needName = false;
    state.needGender = false;
    if (state.polygamy === null) {
      if (context.includes('Enable Polygamy?') && context.includes('title: "Yes"')) {
        state.polygamy = true;
      } else if (context.includes('Enable Polygamy?') && context.includes('title: "No"')) {
        state.polygamy = false;
      }
    }
    if (state.suitorGender === null) {
      if (context.includes('Romance Gender Preference') && context.includes('title: "Female"')) {
        state.suitorGender = 'Female';
      } else if (context.includes('Romance Gender Preference') && context.includes('title: "Male"')) {
        state.suitorGender = 'Male';
      } else if (context.includes('Romance Gender Preference') && context.includes('title: "Both"')) {
        state.suitorGender = 'Both';
      }
    }
    if (state.clubChoice === null) {
      // Club parsing logic...
    }
    if (currentGirl && state.bondLevel[currentGirl] >= 3 && state.darkThemes) {
      append += ' [Subtly introduce fetish for ' + currentGirl + ', tied to traits/mental health for emotional depth—only in intimate/escalating moments.]';
    }
    // Handle suitor-specific compression if bondLevel > 1 (moved from library for scope safety)
    if (currentGirl && state.bondLevel[currentGirl] > 1) {
      if (prepareMemoryCompression(currentGirl.toLowerCase())) {
        promptCompression();
      }
    }
    // Moved suitor integration with try-catch for safety and debugging
    try {
      if (currentGirl && currentGirl !== 'unknown' && !getAutoCard(currentGirl)) {
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
