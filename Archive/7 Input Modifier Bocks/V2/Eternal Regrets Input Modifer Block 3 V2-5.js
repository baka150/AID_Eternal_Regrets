// start block 3/3
    function detectSentiment(text) {
      const positiveKeywords = ['love', 'happy', 'kiss', 'embrace', 'joy', 'excited', 'affection', 'tender', 'warm', 'like', 'enjoy', 'smile', 'care', 'hold']; // Added more for better detection in romance actions
      const negativeKeywords = ['regret', 'sad', 'hurt', 'betray', 'pain', 'lonely', 'reject', 'despair', 'fear', 'angry', 'avoid', 'cry', 'ignore']; // Added more for nuance
      const lowerText = text.toLowerCase();
      if (positiveKeywords.some(k => lowerText.includes(k))) return 'positive';
      if (negativeKeywords.some(k => lowerText.includes(k))) return 'negative';
      return 'neutral'; // Fallback
    }
    let sentiment = detectSentiment(text); // Define sentiment variable
    // ... (other functions)
    if (text.toLowerCase().includes('outside')) {
      if (sentiment !== 'positive' || !text.includes('love')) {
        result += ' [Redirect: I decide to stay within the academy grounds for now.]';
      } // Allow romance-driven drifts
    }
    state.lingerCounter++;
    if (sentiment !== 'neutral') {  // Added: Reset linger on positive/negative to allow bond-deepening without skips
      state.lingerCounter = 0;
    }
    if (sentiment === 'neutral' && state.lingerCounter > 2) { // Only advance on neutral if lingering >2
      result += ' [Time advances subtly to next event.]';
      state.lingerCounter = 0; // Reset to allow short neutrals without skip
    }
    return {text: result};
  } catch (e) {
    return {text: result + ' [Error in input: ' + e.message + ']'};
  }
};
modifier(text);
// end block 3/3
