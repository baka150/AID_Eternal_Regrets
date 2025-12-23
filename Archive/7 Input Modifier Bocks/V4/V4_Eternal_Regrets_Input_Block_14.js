// start JavaScript Code Segment 14 of 15, original lines 131-140 (balanced)
const lingerThreshold = state.outsideMode ? 10 : 5; // Longer threshold outside
    if (sentiment === 'neutral' && state.lingerCounter > lingerThreshold) {
      advancePeriod();
      result += ' [Time advances subtly to next event.]';
      state.lingerCounter = 0;
      state.sceneTurnCounter = 0;
    }
// end sub-block 11
// end Input Modifier Block 11
// start Input Modifier Block 12
// end JavaScript Code Segment 14 of 15