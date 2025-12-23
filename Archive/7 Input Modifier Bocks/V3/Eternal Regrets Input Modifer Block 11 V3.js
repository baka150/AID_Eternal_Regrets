// start sub-block 11 (linger counter logic)
    state.lingerCounter = state.lingerCounter || 0;
    state.lingerCounter++;
    if (sentiment !== 'neutral') { // Reset linger on positive/negative to allow bond-deepening without skips
      state.lingerCounter = 0;
      state.sceneTurnCounter = 0; // Also reset scene counter for non-neutrals
    }
    const lingerThreshold = state.outsideMode ? 10 : 5; // Longer threshold outside
    if (sentiment === 'neutral' && state.lingerCounter > lingerThreshold) {
      advancePeriod();
      result += ' [Time advances subtly to next event.]';
      state.lingerCounter = 0;
      state.sceneTurnCounter = 0;
    }
// end sub-block 11
