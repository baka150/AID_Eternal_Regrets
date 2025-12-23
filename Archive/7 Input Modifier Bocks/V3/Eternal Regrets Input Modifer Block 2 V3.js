// start sub-block 2 (state init)
    state.timeCycle = (state.timeCycle || 0) + 1;
    state.sceneTurnCounter = (state.sceneTurnCounter || 0) + 1;
    const periods = ['Morning', 'Afternoon', 'Evening', 'Night'];
    if (!state.currentPeriodIndex) state.currentPeriodIndex = 0;
    if (typeof state.outsideMode === 'undefined') state.outsideMode = false; // Init outside mode
    if (!state.memory) state.memory = { context: '' }; // Initialize memory to prevent undefined errors
    state.memory.context += ' ' + text; // Append current input to build context over turns
// end sub-block 2
