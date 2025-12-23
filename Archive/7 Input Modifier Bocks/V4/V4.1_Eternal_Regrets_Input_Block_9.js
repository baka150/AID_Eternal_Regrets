// start JavaScript Code Segment 9 of 14, original lines 81-90 (continued - unbalanced braces)
// end Block 9
// start Block 10
// Manual advance command
        advancePeriod();
        state.sceneTurnCounter = 0;
        state.lingerCounter = 0;
        result += ' [Time advanced manually.]';
      }
      return {text: result}; // Early return for commands
    }
// end JavaScript Code Segment 9 of 14