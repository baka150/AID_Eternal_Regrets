// start JavaScript Code Segment 5 of 14, original lines 41-50 (balanced)
result += ` [Day advances to Day ${state.day}. Period resets to Morning.]`;
      } else {
// end Block 5
// start Block 6
        // School: Advance period normally
        state.currentPeriodIndex = (state.currentPeriodIndex + 1) % periods.length;
        if (state.currentPeriodIndex === 0) {
          state.day = (state.day || 1) + 1;
          result += ` [Day advances to Day ${state.day}.]`;
        }
// end JavaScript Code Segment 5 of 14