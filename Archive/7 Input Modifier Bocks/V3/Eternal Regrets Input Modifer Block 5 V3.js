// start sub-block 5 (advancePeriod function - outside)
    function advancePeriod() {
      if (state.outsideMode) {
        // Outside: Advance full day for longer pacing
        state.day = (state.day || 1) + 1;
        state.currentPeriodIndex = 0; // Reset to Morning
        result += ` [Day advances to Day ${state.day}. Period resets to Morning.]`;
      } else {
// end sub-block 5
