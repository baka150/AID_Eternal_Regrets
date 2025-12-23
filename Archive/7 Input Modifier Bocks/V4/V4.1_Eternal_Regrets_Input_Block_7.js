// start JavaScript Code Segment 7 of 14, original lines 61-70 (balanced)
// end Block 7
// start Block 8
    function parseCurrentGirl(context) {
      const match = context.match(/(?:I'm |She is |named |calls herself |She says, 'I'm )(\w+(?:\s\w+)?)/i) || context.match(/A girl with .* hair .* "I'm (\w+(?:\s\w+)?)/i);
      if (!match) {
        // Fallback scan for general name intros
        match = context.match(/([A-Z]\w+(?:\s[A-Z]\w+)?)(?: says| introduces| is my name)/);
      }
      return match ? match[1] : 'unknown'; // Fallback to 'unknown' for safety
    }
// end JavaScript Code Segment 7 of 14