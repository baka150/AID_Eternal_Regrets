// start JavaScript Code Segment 5 of 15, original lines 41-50 (continued - unbalanced braces)
function advancePeriod() {
      if (state.outsideMode) {
        // Outside: Advance full day for longer pacing
        state.day = (state.day || 1) + 1;
        state.currentPeriodIndex = 0; // Reset to Morning
        result += ` [Day advances to Day ${state.day}. Period resets to Morning.]`;
      } else {
// end sub-block 5
// end Input Modifier Block 5
// start Input Modifier Block 6
// end JavaScript Code Segment 5 of 15