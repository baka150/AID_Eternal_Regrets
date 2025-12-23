// start block 1/3
const modifier = (text) => {
  let resultFromAuto = AutoCards("input", text); // Call AutoCards
  text = Array.isArray(resultFromAuto) ? resultFromAuto[0] : resultFromAuto; // Handle array or string return
  let result = text;
  try {
    // Add debug if needed
    console.log('Input Modifier: text after AutoCards is', typeof text);
    state.timeCycle = (state.timeCycle || 0) + 1;
    state.sceneTurnCounter = (state.sceneTurnCounter || 0) + 1;
    function advancePeriod() {  // Added definition: Cycles through academy periods, advances day on wraparound
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
