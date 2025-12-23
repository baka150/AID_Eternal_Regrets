// start JavaScript Code Segment 3 of 6, original lines 21-30 (balanced)
const match = context.match(/(?:I'm |She is |named |calls herself |She says, 'I'm )(\w+(?:\s\w+)?)/i) || context.match(/A girl with .* hair .* "I'm (\w+(?:\s\w+)?)/i);
    if (!match) {
      // Fallback scan for general name intros
      match = context.match(/([A-Z]\w+(?:\s[A-Z]\w+)?)(?: says| introduces| is my name)/);
    }
    return match ? match[1] : 'unknown'; // Fallback to 'unknown' for safety
  }
// end block 2/4
// start block 3/4
  try {
// end JavaScript Code Segment 3 of 6