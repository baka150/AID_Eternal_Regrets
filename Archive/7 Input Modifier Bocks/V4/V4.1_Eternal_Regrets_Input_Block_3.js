// start JavaScript Code Segment 3 of 14, original lines 21-30 (balanced)
const negativeKeywords = ['regret', 'sad', 'hurt', 'betray', 'pain', 'lonely', 'reject', 'despair', 'fear', 'angry', 'avoid', 'cry', 'ignore', 'tears', 'hate', 'fight']; 
// end Block 3
// start Block 4
      const lowerText = text.toLowerCase();
      if (positiveKeywords.some(k => lowerText.includes(k))) return 'positive';
      if (negativeKeywords.some(k => lowerText.includes(k))) return 'negative';
      const firstWord = text.trim().split(' ')[0].toLowerCase();
      if (!positiveKeywords.some(k => lowerText.includes(k)) && !negativeKeywords.some(k => lowerText.includes(k)) && firstWord.match(/^[a-z]+$/i)) {
        return 'positive';
      }
// end JavaScript Code Segment 3 of 14