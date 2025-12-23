// start sub-block 8 (command handling)
    if (text.trim().startsWith('/') && !state.memory.context.includes(text)) {
      if (text === '/status') {
        // Status dump logic...
        result += ' [Status: Day ' + (state.day || 1) + ', Period: ' + periods[state.currentPeriodIndex] + ', Linger: ' + state.lingerCounter + ', Outside Mode: ' + state.outsideMode + ']'; // Updated stub for diagnostics
      } else if (text === '/affection') {
        // Affection summary...
        result += ' [Affection levels: ' + JSON.stringify(state.bondLevel || {}) + ']'; // Stub for diagnostics
      } else if (text === '/advance') {
        // Manual advance command
        advancePeriod();
        state.sceneTurnCounter = 0;
        state.lingerCounter = 0;
        result += ' [Time advanced manually.]';
      }
      return {text: result}; // Early return for commands
    }
// end sub-block 8
