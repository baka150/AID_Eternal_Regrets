// start JavaScript Code Segment 4 of 15, original lines 31-40 (continued - unbalanced braces)
const lowerText = text.toLowerCase();
      if (positiveKeywords.some(k => lowerText.includes(k))) return 'positive';
      if (negativeKeywords.some(k => lowerText.includes(k))) return 'negative';
      return 'neutral';
    }
    let sentiment = detectSentiment(text); // Sentiment assignment
// end sub-block 4
// end Input Modifier Block 4
// start Input Modifier Block 5
// start sub-block 5 (advancePeriod function - outside)
// end JavaScript Code Segment 4 of 15