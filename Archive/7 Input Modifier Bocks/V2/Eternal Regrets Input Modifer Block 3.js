// start block 3/3
    function detectSentiment(text) {
      const positiveKeywords = ['love', 'happy', 'kiss', 'embrace', 'joy', 'excited', 'affection', 'tender', 'warm'];
      const negativeKeywords = ['regret', 'sad', 'hurt', 'betray', 'pain', 'lonely', 'reject', 'despair', 'fear'];
      const lowerText = text.toLowerCase();
      if (positiveKeywords.some(k => lowerText.includes(k))) return 'positive';
      if (negativeKeywords.some(k => lowerText.includes(k))) return 'negative';
      return 'neutral'; // Fallback
    }
    const sentiment = detectSentiment(text);
    const currentGirl = parseCurrentGirl(state.memory.context || '');
    if (currentGirl) {
      state.discomfort[currentGirl] = (state.discomfort[currentGirl] || 0) + (sentiment === 'negative' ? 1 : 0);
      if (sentiment === 'negative') result += ' [Backstory tie: My past yearning makes me reflect, seeking tenderness.]'; // Custom: Backstory integration
    }
    if (text.toLowerCase().includes('leave academy') || text.toLowerCase().includes('outside')) {
      if (sentiment !== 'positive' || !text.includes('love')) {
        result += ' [Redirect: I decide to stay within the academy grounds for now.]';
      } // Allow romance-driven drifts
    }
    state.lingerCounter++;
    if (state.sceneTurnCounter > 3 || sentiment === 'neutral') {
      result += ' [Time advances subtly to next event.]';
    }
    return {text: result};
  } catch (e) {
    return {text: result + ' [Error in input: ' + e.message + ']'};
  }
};
modifier(text);
// end block 3/3
