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
    if (state.sceneTurnCounter > 5) {
      advancePeriod();
      result += ' [Scene auto-ends: Period advances due to lingering.]';
      state.sceneTurnCounter = 0;
    }
// end sub-block 6
