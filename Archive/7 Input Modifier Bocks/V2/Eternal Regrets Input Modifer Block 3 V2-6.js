// start block 3/3
    // ... (other functions, if any; detectSentiment moved to Block 1)
    if (text.toLowerCase().includes('outside')) {
      if (sentiment !== 'positive' || !text.includes('love')) {
        result += ' [Redirect: I decide to stay within the academy grounds for now.]';
      } // Allow romance-driven drifts
    }
    state.lingerCounter++;
    if (sentiment !== 'neutral') {  // Reset linger on positive/negative to allow bond-deepening without skips
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
