// start JavaScript Code Segment 11 of 14, original lines 101-110 (continued - unbalanced braces)
if (sentiment === 'positive' && text.includes('love') && ['Lover', 'Spouse', 'Parent'].includes(currentBond)) {
        state.outsideMode = true;
        result += ' [Venturing outside: Mode switched to freeform exploration.]';
      } else {
        result += ' [Redirect: I decide to stay within the academy grounds for now.]';
      } // Allow romance-driven drifts at high bonds
    }
// end Block 12
// start Block 13
    state.lingerCounter = state.lingerCounter || 0;
// end JavaScript Code Segment 11 of 14