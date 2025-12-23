// start Block 1
const modifier = (text) => {
  let resultFromAuto = AutoCards("input", text); // Call AutoCards
  text = Array.isArray(resultFromAuto) ? resultFromAuto[0] : resultFromAuto; // Handle array or string return
  let result = text;
  try {
// end Block 1
// start Block 2
    state.timeCycle = (state.timeCycle || 0) + 1;
    state.sceneTurnCounter = (state.sceneTurnCounter || 0) + 1;
    const periods = ['Morning', 'Afternoon', 'Evening', 'Night'];
    if (!state.currentPeriodIndex) state.currentPeriodIndex = 0;
    if (typeof state.outsideMode === 'undefined') state.outsideMode = false; // Init outside mode
    if (!state.memory) state.memory = { context: '' }; // Initialize memory to prevent undefined errors
    if (!state.bondLevel) state.bondLevel = {}; // Safeguard for romance bonds
    state.memory.context += ' ' + text; // Append current input to build context over turns
// end Block 2
// start Block 3
    function detectSentiment(text) {
      const positiveKeywords = ['love', 'happy', 'kiss', 'embrace', 'joy', 'excited', 'affection', 'tender', 'warm', 'like', 'enjoy', 'smile', 'care', 'hold', 'dance', 'twerk', 'breakdance', 'strip', 'act', 'start', 'good', 'surprising', 'very'];
      const negativeKeywords = ['regret', 'sad', 'hurt', 'betray', 'pain', 'lonely', 'reject', 'despair', 'fear', 'angry', 'avoid', 'cry', 'ignore', 'tears', 'hate', 'fight'];
// end Block 3
// start Block 4
      const lowerText = text.toLowerCase();
      if (positiveKeywords.some(k => lowerText.includes(k))) return 'positive';
      if (negativeKeywords.some(k => lowerText.includes(k))) return 'negative';
      const firstWord = text.trim().split(' ')[0].toLowerCase();
      if (!positiveKeywords.some(k => lowerText.includes(k)) && !negativeKeywords.some(k => lowerText.includes(k)) && firstWord.match(/^[a-z]+$/i)) {
        return 'positive';
      }
      return 'neutral';
    }
    let sentiment = detectSentiment(text);
// end Block 4
// start Block 5
function advancePeriod() {
      if (state.outsideMode) {
        // Outside: Advance full day for longer pacing
        state.day = (state.day || 1) + 1;
        state.currentPeriodIndex = 0; // Reset to Morning
        result += ` [Day advances to Day ${state.day}. Period resets to Morning.]`;
      } else {
// end Block 5
// start Block 6
        // School: Advance period normally
        state.currentPeriodIndex = (state.currentPeriodIndex + 1) % periods.length;
        if (state.currentPeriodIndex === 0) {
          state.day = (state.day || 1) + 1;
          result += ` [Day advances to Day ${state.day}.]`;
        }
        result += ` [Period advances to ${periods[state.currentPeriodIndex]}.]`; // Subtle note for immersion
      }
    }
// end Block 6
// start Block 7
if (state.sceneTurnCounter > 5) {
      advancePeriod();
      result += ' [Scene auto-ends: Period advances due to lingering.]';
      state.sceneTurnCounter = 0;
    }
// end Block 7
// start Block 8
    function parseCurrentGirl(context) {
      const match = context.match(/(?:I'm |She is |named |calls herself |She says, 'I'm )(\w+(?:\s\w+)?)/i) || context.match(/A girl with .* hair .* "I'm (\w+(?:\s\w+)?)/i);
      if (!match) {
        // Fallback scan for general name intros
        match = context.match(/([A-Z]\w+(?:\s[A-Z]\w+)?)(?: says| introduces| is my name)/);
      }
      return match ? match[1] : 'unknown'; // Fallback to 'unknown' for safety
    }
// end Block 8
// start Block 9
    if (text.trim().startsWith('/') && !state.memory.context.includes(text)) {
      if (text === '/status') {
        // Status dump logic...
        result += ' [Status: Day ' + (state.day || 1) + ', Period: ' + periods[state.currentPeriodIndex] + ', Linger: ' + state.lingerCounter + ', Outside Mode: ' + state.outsideMode + ']'; // Updated stub for diagnostics
      } else if (text === '/affection') {
        // Affection summary...
        result += ' [Affection levels: ' + JSON.stringify(state.bondLevel || {}) + ']'; // Stub for diagnostics
      } else if (text === '/advance') {
// end Block 9
// start Block 10
// Manual advance command
        advancePeriod();
        state.sceneTurnCounter = 0;
        state.lingerCounter = 0;
        result += ' [Time advanced manually.]';
      }
      return {text: result}; // Early return for commands
    }
// end Block 10
// start Block 11
    if (!text.trim() || text.toLowerCase() === 'continue') {
      // Auto-progress based on bond...
      result += ' [Auto-continue: Time advances subtly.]'; // Stub for now
    }
// end Block 11
// start Block 12
    if (text.toLowerCase().includes('outside')) {
      const currentBond = state.bondLevel?.[parseCurrentGirl(state.memory.context)] || 'Acquaintance'; // Get bond for current interaction
      if (sentiment === 'positive' && text.includes('love') && ['Lover', 'Spouse', 'Parent'].includes(currentBond)) {
        state.outsideMode = true;
        result += ' [Venturing outside: Mode switched to freeform exploration.]';
      } else {
        result += ' [Redirect: I decide to stay within the academy grounds for now.]';
      } // Allow romance-driven drifts at high bonds
    }
// end Block 12
// start Block 13
    state.lingerCounter = state.lingerCounter || 0;
    state.lingerCounter++;
    state.lingerCounter = 0;
    state.sceneTurnCounter = 0;
// end Block 13
// start Block 14
const lingerThreshold = state.outsideMode ? 20 : 10;
    if (state.lingerCounter > lingerThreshold) {
      advancePeriod();
      result += ' [Time advances subtly to next event.]';
      state.lingerCounter = 0;
      state.sceneTurnCounter = 0;
    }
// end Block 14
// start Block 15
    return {text: result};
  } catch (e) {
    console.log('Full error stack:', e.stack || e); // Amplified logging for better diagnostics
    return {text: result + ' [Error in input: ' + (e.message || 'Unknown error') + ']'};
  }
};
modifier(text);
// end Block 15
