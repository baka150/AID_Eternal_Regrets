// Eternal Regrets Input Modifier (Merged V1.js)
// Merged custom logic into Lewd Leah's wrapper to resolve redeclaration error

const modifier = (text) => {
  // Processes user input - handles commands, advances, sentiments
  text = AutoCards("input", text);
  let result = text;
  try {
    // Increment timeCycle only here - advances overall time
    state.timeCycle = (state.timeCycle || 0) + 1;
    state.sceneTurnCounter = (state.sceneTurnCounter || 0) + 1; // For dragging detection
    // Scene auto-ends - on threshold
    if (state.sceneTurnCounter > 3) { // Threshold for auto-end
      advancePeriod();
      result += ' [Scene auto-ends: Period advances due to lingering.]';
      state.sceneTurnCounter = 0;
    }
    // Command handling with priority override - interrupts narrative for commands
    if (text.trim().startsWith('/') && !state.memory.context.includes(text)) {
      if (text === '/status') {
        try {
          let status = 'Full AI View:\n';
          status += 'Player: ' + state.playerName + ' (' + state.playerGender + '), Backstory: ' + state.playerBackstory + '\n';
          status += 'Time Cycle: Day ' + state.timeCycle + ', Period: ' + state.currentPeriod + ', Day: ' + getDayName(state.dayOfWeek) + '\n';
          status += 'Polygamy: ' + (state.polygamy ? 'Yes' : 'No') + ', Suitor Gender: ' + state.suitorGender + '\n';
          status += 'Club: ' + (state.clubChoice || 'None') + '\n';
          status += 'Suitor Ledger:\n';
          state.suitorLedger.forEach(s => {
            status += '- ' + s.name + ': Bond ' + (state.bondLevel[s.name] || 0) + ' (' + getBondPhase(state.bondLevel[s.name] || 0) + ')\n';
            status += ' - Personality: ' + s.traits.personality + '\n';
            status += ' - Background: ' + s.traits.background + '\n';
            status += ' - Super Traits: ' + s.traits.superTraits.join(', ') + '\n';
            status += ' - Favorite Color: ' + s.traits.favoriteColor + '\n';
            status += ' - Favorite Food: ' + s.traits.favoriteFood + '\n';
            status += ' - Dynamic: ' + s.traits.dynamic + '\n';
            status += ' - Fetishes: ' + s.traits.fetishes.join(', ') + '\n';
            status += ' - Backstory: ' + s.traits.backstory + '\n';
            status += ' - Advance Rate: ' + s.traits.advanceRate + '\n';
            status += ' - Flaw: ' + s.traits.flaw + '\n';
            status += ' - Weakness: ' + s.traits.weakness + '\n';
            status += ' - Like: ' + s.traits.like + '\n';
            status += ' - Dislike: ' + s.traits.dislike + '\n';
            status += ' - Mental Health: ' + s.traits.mentalHealth + '\n';
            status += ' - Demeanor: ' + s.traits.demeanor + '\n';
            status += ' - Confidence: ' + s.traits.confidence + '\n';
            status += ' - Mood: ' + s.traits.mood + ']\n';
          });
          status += 'Discomfort Levels:\n' + JSON.stringify(state.discomfort) + '\n';
          status += 'Dynamic Cards:\n' + JSON.stringify(state.dynamicCards) + '\n';
          status += 'Suitor Locations:\n' + JSON.stringify(state.suitorLocations) + '\n';
          status += 'Commands:\n' + state.commands.join(', ') + '\n';
          status += 'Trait Pool Summary: ' + Object.keys(state.traitPool).join(', ') + ' (detailed pools available)\n';
          status += '\nAll traits listed here for debugging; in-narrative reveals remain gradual.'; // Clarifying note
          return status; // Full dump as string - for debugging
        } catch (e) {
          return ' [Error in dump: ' + e + ']';
        }
      } else if (text === '/affection') {
        let affection = 'Bond Levels:\n';
        Object.keys(state.bondLevel).forEach(g => {
          affection += '- ' + g + ': ' + state.bondLevel[g] + ' (' + getBondPhase(state.bondLevel[g]) + ')\n';
        });
        return affection; // Full outputs - bond summary
      }
      // Other commands can be added - passes unknown
      return result; // If unknown, pass through
    }
    // Auto-progress on blank/continue - gentle actions based on level
    if (!text.trim() || text.toLowerCase() === 'continue') {
      const currentGirl = parseCurrentGirl(state.memory.context || '');
      if (currentGirl) {
        const level = state.bondLevel[currentGirl] || 0;
        if (level < 1) result = 'I greet her warmly, starting a conversation.';
        else if (level < 2) result = 'I chat casually, building friendship.';
        else if (level < 4) result = 'I flirt lightly, sharing a laugh.';
        else if (level < 6) result = 'I suggest a date, deepening our connection.';
        else result = 'I propose a meaningful moment, advancing our bond.';
      } else {
        result = 'I explore the area, looking for encounters.';
      }
    }
    // Sentiment detection for discomfort/bond (preliminary) - updates based on keywords. Tailored: On negative, tie to backstory yearning for resolution
    const sentiment = detectSentiment(text);
    const currentGirl = parseCurrentGirl(state.memory.context || '');
    if (currentGirl) {
      state.discomfort[currentGirl] = (state.discomfort[currentGirl] || 0) + (sentiment === 'negative' ? 1 : 0);
      if (sentiment === 'negative') result += ' [Backstory tie: My past yearning makes me reflect, seeking tenderness.]'; // Custom: Backstory integration
    }
    // School focus redirects - prevents non-romance drifts
    if (text.toLowerCase().includes('leave academy') || text.toLowerCase().includes('outside')) {
      if (detectSentiment(text) !== 'positive' || !text.includes('love')) {
        result += ' [Redirect: I decide to stay within the academy grounds for now.]';
      } // Allow romance-driven drifts
    }
    // Stalling detection for auto-advance - adds prompt on neutral
    state.lingerCounter++;
    if (state.sceneTurnCounter > 3 || detectSentiment(text) === 'neutral') {
      result += ' [Time advances subtly to next event.]';
    }
    return {text: result};
  } catch (e) {
    return {text: result + ' [Error in input: ' + e.message + ']'};; // Error handling
  }
};
modifier(text)
