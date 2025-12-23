// start block 1/4
const modifier = function(text, ...rest) {
  let stop = rest[0] || false; // Safe assignment using rest params, no 'arguments' needed
  // let [newText, newStop] = AutoCards("context", text, stop) || [text, stop]; // Temporarily commented out for testing
  let newText = text; // Fallback to original text
  let newStop = stop;
  text = newText;
  stop = newStop;
  let append = '';
  let AC = state.AutoCards || {}; // Local safeguard to ensure AC is defined
  console.log('AC initialized:', !!AC); // Debug log to confirm
  if (!state.memory) state.memory = { context: '' }; // Initialize memory to prevent undefined errors
  state.memory.context += ' ' + text; // Append current context to build over turns (note: text here is the prompt, so this accumulates history)
  if (AC.config && AC.config.showDebugData) {
    console.log('Context Modifier: stop value pre-call was', rest[0], '; post-call is', stop); // Temporary debug log
  }
// end block 1/4
// start block 2/4
  function parseCurrentGirl(context) {
    // Enhanced regex with fallback: First try specific patterns, then general scan for names like "She says, 'I'm [Name]'" or intros
    const match = context.match(/(?:I'm |She is |named |calls herself |She says, 'I'm )(\w+(?:\s\w+)?)/i) || context.match(/A girl with .* hair .* "I'm (\w+(?:\s\w+)?)/i);
    if (!match) {
      // Fallback scan for general name intros
      match = context.match(/([A-Z]\w+(?:\s[A-Z]\w+)?)(?: says| introduces| is my name)/);
    }
    return match ? match[1] : 'unknown'; // Fallback to 'unknown' for safety
  }
// end block 2/4
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
    state.memory.context = (state.memory.context || text.slice(0, info.memoryLength)) + append;
    return {text: state.memory.context + text.slice(info.memoryLength), stop};
  } catch (e) {
    console.log('Context error: ' + e.message); // Silent log instead of appending to text
    return {text: state.memory.context || '', stop}; // Safe fallback to prevent empty returns
  }
// end block 3/4
// start block 4/4
};
modifier(text);
// end block 4/4
