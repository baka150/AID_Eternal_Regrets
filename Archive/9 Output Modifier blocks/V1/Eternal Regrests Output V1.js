// Output Modifier
// Comment: Integrated Lewd Leah's wrapper with our custom logic. AutoCards called first for card/output handling, then our variations/softening. Added comments for sections; deleted placeholders. Tailored: Added backstory emotional tie on negatives, conditional fetish adds only on currentGirl to reduce bloat.

const modifier = (text) => {
  text = AutoCards("output", text);
  // Modifies final output - adds headers, descriptors, handling, etc.
  try {
    // Time-skip for high bonds - wedding prompt, limited to one per turn for polygamy
    let weddingTriggered = false;
    Object.keys(state.bondLevel).forEach(g => {
      if (!weddingTriggered && state.bondLevel[g] > 10 && state.timeCycle > 50) {
        text += '\n[Time passes: We wed under the stars if proposed.]';
        weddingTriggered = true; // Prevent multiple
      }
    });
    // Expanded descriptors - randomizes common words for variety, scoped to non-quotes
    const descriptors = {
      'cute': ['adorable', 'charming', 'alluring', 'endearing', 'captivating'],
      'kiss': ['tender kiss', 'passionate embrace', 'soft lips meeting', 'gentle peck', 'fiery smooch'],
      'touch': ['warm touch', 'soft caress', 'gentle stroke', 'electric brush'],
      'scent': ['floral scent', 'sweet aroma', 'musky fragrance', 'enchanting perfume'],
      'emotion': ['racing heart', 'fluttering butterflies', 'deep affection', 'burning desire']
    };
    Object.keys(descriptors).forEach(key => {
      text = text.replace(new RegExp(`\\b${key}\\b(?!.*")`, 'gi'), () => descriptors[key][random(0, descriptors[key].length - 1)]);
    });
    // Boundary handling - de-escalates based on discomfort
    const currentGirl = parseCurrentGirl(state.memory.context || '');
    const discomfortCount = state.discomfort[currentGirl] || 0;
    const {text: newText, reset} = handleBoundaryAndFlaw(currentGirl, discomfortCount, text);
    text = newText;
    if (reset) state.discomfort[currentGirl] = 0; // Reset on de-escalate
    // Ally intervention - on help cues
    text = handleAllyIntervention(text, state);
    // Escape handling - on keywords
    text = handleEscape(text);
    // Bond update with thresholds - sentiment-based adjustments
    const sentiment = detectSentiment(text);
    if (currentGirl && sentiment === 'positive') {
      updateBond(currentGirl, 1);
    } else if (sentiment === 'negative') {
      updateBond(currentGirl, -0.5);
      text += ' [Backstory tie: My past scars make this hurt more, but I seek resolution.]'; // Custom: Emotional flair from backstory
    }
    // Threshold enforcement - blocks actions below levels
    const level = state.bondLevel[currentGirl] || 0;
    if (level < 1 && text.includes('touch')) text = text.replace(/touch/gi, 'friendly gesture'); // Example block
    if (level < 2 && text.includes('kiss')) text += ' [De-escalate: Too soon—shift to flirt.]';
    // Time skip on cycles - for progression
    if (state.timeCycle % 10 === 0 && level > 5) {
      text += ' [Time skip: Days pass, advancing bonds subtly.]';
    }
    // Fetish subtle add - chance-based if met, conditional on currentGirl
    if (currentGirl && level >= 1) {
      const suitor = state.suitorLedger.find(s => s.name === currentGirl);
      if (suitor && suitor.traits.fetishes.length > 0 && random(0,99) < 20) { // Subtle chance
        text += ' [Weave subtle fetish element tied to traits/groups consensually.]';
      }
    }
    // Bond hints - shows phase changes
    if (state.sceneBondDelta[currentGirl] > 0) text += ' [Bond deepened to ' + getBondPhase(level) + ']';
    // Dialog hints - on emotions
    if (level >= 1 && detectSentiment(text) !== 'neutral') text += ' [Encourage verbal response/reaction.]';
    // Auto-advance on stalling - prevents dragging
    if (state.sceneBondDelta[currentGirl] < 0.5 && sentiment === 'neutral') {
      text += ' [Auto-advance: Scene progresses to next event or period on stalling detection.]';
    }
    // Softening negatives - for positive resolutions
    const negativePhrases = {
      'ends badly': 'resolves tenderly',
      'fight': 'misunderstanding resolved',
      'hate': 'moment of tension eased',
      'leave forever': 'temporary parting with hope'
    };
    Object.keys(negativePhrases).forEach(phrase => {
      text = text.replace(new RegExp(phrase, 'gi'), negativePhrases[phrase]);
    });
    // New suitor profile dump - immediate on trigger
    if (state.newSuitor) {
      const suitor = state.suitorLedger.find(s => s.name === state.newSuitor);
      if (suitor) {
        let profile = '\n[New Suitor Profile for ' + state.newSuitor + ':\n';
        profile += '- Personality: ' + suitor.traits.personality + '\n';
        profile += '- Background: ' + suitor.traits.background + '\n';
        profile += '- Super Traits: ' + suitor.traits.superTraits.join(', ') + '\n';
        profile += '- Favorite Color: ' + suitor.traits.favoriteColor + '\n';
        profile += '- Favorite Food: ' + suitor.traits.favoriteFood + '\n';
        profile += '- Dynamic: ' + suitor.traits.dynamic + '\n';
        profile += '- Fetishes: ' + suitor.traits.fetishes.join(', ') + '\n';
        profile += '- Backstory: ' + suitor.traits.backstory + '\n';
        profile += '- Advance Rate: ' + suitor.traits.advanceRate + '\n';
        profile += '- Flaw: ' + suitor.traits.flaw + '\n';
        profile += '- Weakness: ' + suitor.traits.weakness + '\n';
        profile += '- Like: ' + suitor.traits.like + '\n';
        profile += '- Dislike: ' + suitor.traits.dislike + '\n';
        profile += '- Mental Health: ' + suitor.traits.mentalHealth + '\n';
        profile += '- Demeanor: ' + suitor.traits.demeanor + '\n';
        profile += '- Confidence: ' + suitor.traits.confidence + '\n';
        profile += '- Mood: ' + suitor.traits.mood + ']\n';
        text += profile;
      }
      state.newSuitor = null; // Reset flag
    }
    // First-person enforcement - replace 'You' with 'I' where appropriate
    text = text.replace(/\bYou\b/g, 'I');
    return text;
  } catch (e) {
    text += ' [Error: ' + e + ']'; // Error handling
    return text;
  }
};
modifier(text)
