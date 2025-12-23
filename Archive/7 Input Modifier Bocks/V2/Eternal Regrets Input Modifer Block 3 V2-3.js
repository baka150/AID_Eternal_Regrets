// start block 3/3
    function detectSentiment(text) {
      const positiveKeywords = ['love', 'happy', 'kiss', 'embrace', 'joy', 'excited', 'affection', 'tender', 'warm', 'like', 'enjoy', 'smile', 'care', 'hold']; // Added more for better detection in romance actions
      const negativeKeywords = ['regret', 'sad', 'hurt', 'betray', 'pain', 'lonely', 'reject', 'despair', 'fear', 'angry', 'avoid', 'cry', 'ignore']; // Added more for nuance
      const lowerText = text.toLowerCase();
      if (positiveKeywords.some(k => lowerText.includes(k))) return 'positive';
      if (negativeKeywords.some(k => lowerText.includes(k))) return 'negative';
      return 'neutral'; // Fallback
    }
    let sentiment = detectSentiment(text); // Added to define sentiment variable and fix undefined error
    // ... (other functions)
    if (text.toLowerCase().includes('outside')) {
      if (sentiment !== 'positive' || !text.includes('love')) {
        result += ' [Redirect: I decide to stay within the academy grounds for now.]';
      } // Allow romance-driven drifts
    }
    state.lingerCounter++;
    if (sentiment === 'neutral' && state.lingerCounter > 2) { // Changed: Only advance on neutral if lingering >2, no duplicate >3 check (handled in Block 1)
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
