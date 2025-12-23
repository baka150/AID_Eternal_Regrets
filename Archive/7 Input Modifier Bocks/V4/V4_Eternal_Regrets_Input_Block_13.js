// start JavaScript Code Segment 13 of 15, original lines 121-130 (balanced)
// end sub-block 10
// end Input Modifier Block 10
// start Input Modifier Block 11
// start sub-block 11 (linger counter logic)
    state.lingerCounter = state.lingerCounter || 0;
    state.lingerCounter++;
    if (sentiment !== 'neutral') { // Reset linger on positive/negative to allow bond-deepening without skips
      state.lingerCounter = 0;
      state.sceneTurnCounter = 0; // Also reset scene counter for non-neutrals
    }
// end JavaScript Code Segment 13 of 15