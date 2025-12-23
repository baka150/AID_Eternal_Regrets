// start JavaScript Code Segment 6 of 15, original lines 51-60 (continued - unbalanced braces)
// start sub-block 6 (advancePeriod function - school and scene logic)
        // School: Advance period normally
        state.currentPeriodIndex = (state.currentPeriodIndex + 1) % periods.length;
        if (state.currentPeriodIndex === 0) {
          state.day = (state.day || 1) + 1;
          result += ` [Day advances to Day ${state.day}.]`;
        }
        result += ` [Period advances to ${periods[state.currentPeriodIndex]}.]`; // Subtle note for immersion
      }
    }
// end JavaScript Code Segment 6 of 15