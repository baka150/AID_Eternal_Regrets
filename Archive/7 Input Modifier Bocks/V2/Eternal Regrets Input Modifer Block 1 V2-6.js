// start block 1/3
const modifier = (text) => {
  let resultFromAuto = AutoCards("input", text); // Call AutoCards
  text = Array.isArray(resultFromAuto) ? resultFromAuto[0] : resultFromAuto; // Handle array or string return
  let result = text;
  try {
    // Add debug if needed
    console.log('Input Modifier: text after AutoCards is', typeof text);
    state.timeCycle = (state.timeCycle || 0) + 1;
    function detectSentiment(text) {  // Moved here from Block 3 to ensure definition before use, fixing scope/declaration issues
      const positiveKeywords = ['love', 'happy', 'kiss', 'embrace', 'joy', 'excited', 'affection', 'tender', 'warm', 'like', 'enjoy', 'smile', 'care', 'hold']; // Added more for better detection in romance actions
      const negativeKeywords = ['regret', 'sad', 'hurt', 'betray', 'pain', 'lonely', 'reject', 'despair', 'fear', 'angry', 'avoid', 'cry', 'ignore']; // Added more for nuance
      const lowerText = text.toLowerCase();
      if (positiveKeywords.some(k => lowerText.includes(k))) return 'positive';
      if (negativeKeywords.some(k => lowerText.includes(k))) return 'negative';
      return 'neutral'; // Fallback
    }
    let sentiment = detectSentiment(text); // Define sentiment here once, no duplicates
    if (text.trim() === '' || sentiment === 'neutral') {  // Only increment on empty or neutral to prevent auto-ends on meaningful inputs
      state.sceneTurnCounter = (state.sceneTurnCounter || 0) + 1;
    }
    function advancePeriod() {  // Definition: Cycles through academy periods, advances day on wraparound
      const periods = ['Morning (classes)', 'Lunch (socializing)', 'Afternoon (clubs)', 'Evening (free time)']; // Tailored to romance building
      state.currentPeriodIndex = (state.currentPeriodIndex || 0) + 1;
      if (state.currentPeriodIndex >= periods.length) {
        state.currentPeriodIndex = 0;
        state.day = (state.day || 1) + 1;
        result += ` [Day advances to Day ${state.day}.]`;
      }
      result += ` [Period advances to ${periods[state.currentPeriodIndex]}.]`; // Subtle note for immersion
    }
    if (state.sceneTurnCounter > 3) {
      advancePeriod();
      result += ' [Scene auto-ends: Period advances due to lingering.]';
      state.sceneTurnCounter = 0;
    }
// end block 1/3
