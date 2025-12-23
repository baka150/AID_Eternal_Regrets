// start JavaScript Code Segment 12 of 14, original lines 111-120 (continued - unbalanced braces)
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
// end JavaScript Code Segment 12 of 14