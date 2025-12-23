// start sub-block 4 (sentiment logic)
      const lowerText = text.toLowerCase();
      if (positiveKeywords.some(k => lowerText.includes(k))) return 'positive';
      if (negativeKeywords.some(k => lowerText.includes(k))) return 'negative';
      return 'neutral';
    }
    let sentiment = detectSentiment(text); // Sentiment assignment
// end sub-block 4
