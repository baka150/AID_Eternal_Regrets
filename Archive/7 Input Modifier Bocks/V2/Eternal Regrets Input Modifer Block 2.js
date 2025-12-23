// start block 2/3
    function parseCurrentGirl(context) {
      // Enhanced regex to capture name variations like "I'm Lyra", "She is Selene Vexford", "She says, 'I'm [Name]'", or "A girl ... I'm Lyra"
      const match = context.match(/(?:I'm |She is |named |calls herself |She says, 'I'm )(\w+(?:\s\w+)?)/i) || context.match(/A girl with .* hair .* "I'm (\w+(?:\s\w+)?)/i);
      return match ? match[1] : '';
    }
    if (text.trim().startsWith('/') && !state.memory.context.includes(text)) {
      if (text === '/status') {
        // Status dump logic...
      } else if (text === '/affection') {
        // Affection summary...
      }
      return result;
    }
    if (!text.trim() || text.toLowerCase() === 'continue') {
      // Auto-progress based on bond...
    }
// end block 2/3
