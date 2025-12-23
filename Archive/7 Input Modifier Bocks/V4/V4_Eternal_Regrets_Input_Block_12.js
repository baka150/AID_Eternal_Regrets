// start JavaScript Code Segment 12 of 15, original lines 111-120 (balanced)
// ... (other functions, if any; detectSentiment moved to Block 1)
    if (text.toLowerCase().includes('outside')) {
      const currentBond = state.bondLevel?.[parseCurrentGirl(state.memory.context)] || 'Acquaintance'; // Get bond for current interaction
      if (sentiment === 'positive' && text.includes('love') && ['Lover', 'Spouse', 'Parent'].includes(currentBond)) {
        state.outsideMode = true;
        result += ' [Venturing outside: Mode switched to freeform exploration.]';
      } else {
        result += ' [Redirect: I decide to stay within the academy grounds for now.]';
      } // Allow romance-driven drifts at high bonds
    }
// end JavaScript Code Segment 12 of 15