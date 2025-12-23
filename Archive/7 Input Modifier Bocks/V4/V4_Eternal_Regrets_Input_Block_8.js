// start JavaScript Code Segment 8 of 15, original lines 71-80 (continued - unbalanced braces)
// Enhanced regex to capture name variations like "I'm Lyra", "She is Selene Vexford", "She says, 'I'm [Name]'", or "A girl ... I'm Lyra"
      const match = context.match(/(?:I'm |She is |named |calls herself |She says, 'I'm )(\w+(?:\s\w+)?)/i) || context.match(/A girl with .* hair .* "I'm (\w+(?:\s\w+)?)/i);
      if (!match) {
        // Fallback scan for general name intros
        match = context.match(/([A-Z]\w+(?:\s[A-Z]\w+)?)(?: says| introduces| is my name)/);
      }
      return match ? match[1] : 'unknown'; // Fallback to 'unknown' for safety
    }
// end sub-block 7
// end Input Modifier Block 7
// end JavaScript Code Segment 8 of 15