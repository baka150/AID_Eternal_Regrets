// start JavaScript Code Segment 6 of 14, original lines 51-60 (continued - unbalanced braces)
result += ` [Period advances to ${periods[state.currentPeriodIndex]}.]`; // Subtle note for immersion
      }
    }
// end Block 6
// start Block 7
if (state.sceneTurnCounter > 5) {
      advancePeriod();
      result += ' [Scene auto-ends: Period advances due to lingering.]';
      state.sceneTurnCounter = 0;
    }
// end JavaScript Code Segment 6 of 14