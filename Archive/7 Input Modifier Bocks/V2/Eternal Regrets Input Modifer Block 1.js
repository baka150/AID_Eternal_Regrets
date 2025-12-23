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
    if (state.sceneTurnCounter > 3) {
      advancePeriod();
      result += ' [Scene auto-ends: Period advances due to lingering.]';
      state.sceneTurnCounter = 0;
    }
// end block 1/3
