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
  if (!state.memory.suitorMemory) state.memory.suitorMemory = {}; // For suitors
  if (!state.memory.classMemory) state.memory.classMemory = {}; // For classes/events
  if (AC.config && AC.config.showDebugData) {
    console.log('Context Modifier: stop value pre-call was', rest[0], '; post-call is', stop); // Temporary debug log
  }
// end block 1/4
// START BLOCK 2/4
  function parseCurrentSuitor(context) {
    // Enhanced regex with fallback: First try specific patterns, then general scan for names like "They say, 'I'm [Name]'" or intros
    const match = context.match(/(?:I'm |They are |named |calls themselves |They say, 'I'm )(\w+(?:\s\w+)?)/i) || context.match(/A person with .* hair .* "I'm (\w+(?:\s\w+)?)/i);
    if (!match) {
      // Fallback scan for general name intros
      match = context.match(/([A-Z]\w+(?:\s[A-Z]\w+)?)(?: says| introduces| is my name)/);
    }
    return match ? match[1] : 'unknown'; // Fallback to 'unknown' for safety
  }
// END BLOCK 2/4
function extractPersonalityFromContext(context) {
  // Simple keyword scan for personality; expand as needed
  const lowerContext = context.toLowerCase();
  if (lowerContext.includes('assertive') || lowerContext.includes('bold')) return 'assertive';
  if (lowerContext.includes('shy') || lowerContext.includes('timid')) return 'shy';
  // Add more: e.g., if (lowerContext.includes('playful')) return 'playful';
  return 'neutral'; // Default if no match
}

function assignFetish(personality, flip) {
  // Fetish list from prompts: consensual dark ones
  const fetishes = ['Dom', 'Sub', 'Equals', 'Servant-Wanter', 'Age Play', 'Switch', 'Pet Play', 'Voyeur/Exhibition', 'Bondage', 'Role Reversal', 'Tease/Denial', 'Wants to Be Shared', 'Humiliation', 'Degradation', 'Impact Play', 'Breath Play', 'Cuckolding', 'Financial Domination', 'Age Regression', 'Whipping']; // Added your prefs
  let baseChance = { dom: 0.3, sub: 0.4, switch: 0.2, equals: 0.1 }; // Example probs
  if (personality === 'assertive') {
    baseChance = flip ? { dom: 0.4, sub: 0.3, switch: 0.2, equals: 0.1 } : { sub: 0.4, dom: 0.3, switch: 0.2, equals: 0.1 };
  } else if (personality === 'shy') {
    baseChance = flip ? { sub: 0.4, dom: 0.3, switch: 0.2, equals: 0.1 } : { dom: 0.4, sub: 0.3, switch: 0.2, equals: 0.1 };
  }
  // Random select based on probs, then pick from list
  const type = weightedRandom(Object.keys(baseChance), Object.values(baseChance));
  return fetishes[Math.floor(Math.random() * fetishes.length)]; // Placeholder; tie better to type
}

function weightedRandom(options, weights) {
  let total = weights.reduce((a, b) => a + b, 0);
  let rand = Math.random() * total;
  for (let i = 0; i < options.length; i++) {
    if (rand < weights[i]) return options[i];
    rand -= weights[i];
  }
}
// START BLOCK 3
  try {
    let currentSuitor = parseCurrentSuitor(text); // Single declaration here
    if (!state.bondLevel) state.bondLevel = {}; // Prevent undefined bondLevel
    if (state.firstRun) {
      append += '\n[Start in dorm; no encounters until player moves.]'; // Trimmed enforces to essentials, reducing initial bloat
      append += '\n[Day 1: Newly arrived, fresh discoveries.]';
      state.firstRun = false; // Ensure it only runs once
    }
    // Fetish assignment: On new suitor detect, randomize based on personality with flips
    function getAutoCard(title) {
      return storyCards.find(card => card.title === title); // Added missing function to check if card exists (returns card or undefined)
    }
    try {  // Inner try for suitor generation to isolate potential errors
      if (currentSuitor !== 'unknown' && !getAutoCard(currentSuitor)) {
        Internal.generateCard({title: currentSuitor});
        if (!state.suitorFetishes) state.suitorFetishes = {};
        const personality = extractPersonalityFromContext(text); // Stub: Pull from context or random - fixed to use 'text' instead of undefined 'context'
        const flipChance = Math.random() < 0.3; // 30% inversion
        let fetish = assignFetish(personality, flipChance); // Use logic from AI_instructions
        state.suitorFetishes[currentSuitor] = fetish;
      }
    } catch (e) {
      console.log('Suitor integration error: ' + e.message); // Debug log
    }
    state.memory.context = (state.memory.context || text.slice(0, info.memoryLength)) + append;
    return {text: state.memory.context + text.slice(info.memoryLength), stop};
  } catch (e) {
    console.log('Context error: ' + e.message); // Silent log instead of appending to text
    return {text: state.memory.context || '', stop}; // Safe fallback to prevent empty returns
  }
// END BLOCK 3
// start block 4/4
};
modifier(text);
// end block 4/4
