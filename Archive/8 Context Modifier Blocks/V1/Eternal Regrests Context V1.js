// Eternal Regrets Context Modifier (Merged V1.js)
// Merged custom logic into Lewd Leah's wrapper for consistency

const modifier = (text) => {
  // Modifies context with prompts/appends - builds dynamic instructions for AI
  [text, stop] = AutoCards("context", text, stop);
  let append = '';
  try {
    if (state.firstRun) {
      append += '\n[Start strictly in dorm after opening; no club/classes until period advances.]';
      append += '\n[This is Day 1 at the academy; no prior events/knowledge—player is newly arrived, discovering everything fresh.]'; // Enforces first day setup
      append += '\n[Enforce: Day 1 starts in dorm solitude—no suitor encounters until player initiates movement or period advances; redirect any early triggers to later public periods like hallway or class.]';
      state.firstRun = false;
    }
    state.needName = false; // Disables name prompt after setup
    state.needGender = false; // Disables gender prompt
    // Parse story card selections into state - handles opt-ins
    if (state.polygamy === null) {
      if (context.includes('Enable Polygamy?') && context.includes('title: "Yes"')) {
        state.polygamy = true;
      } else if (context.includes('Enable Polygamy?') && context.includes('title: "No"')) {
        state.polygamy = false;
      }
    }
    if (state.suitorGender === null) {  // Fixed potential undefined check
      if (context.includes('Romance Gender Preference') && context.includes('title: "Female"')) {
        state.suitorGender = 'Female';
      } else if (context.includes('Romance Gender Preference') && context.includes('title: "Male"')) {
        state.suitorGender = 'Male';
      } else if (context.includes('Romance Gender Preference') && context.includes('title: "Both"')) {
        state.suitorGender = 'Both';
      }
    }
    if (state.clubChoice === null) {
      // Club selection parsing - updated to mixed normal/magical with engaging names
      if (context.includes('Debate Club')) state.clubChoice = 'Verbal Vanguard Club';
      else if (context.includes('Art Club')) state.clubChoice = 'Canvas Conjurers Club';
      else if (context.includes('Sports Club')) state.clubChoice = 'Athletic Alliance Club';
      else if (context.includes('Book Club')) state.clubChoice = 'Lore Legends Society';
      else if (context.includes('Cooking Club')) state.clubChoice = 'Culinary Alchemy Society';
      else if (context.includes('Music Club')) state.clubChoice = 'Harmony Echoes Club';
      else if (context.includes('Enchanted Art Club')) state.clubChoice = 'Enchanted Art Club';
      else if (context.includes('Mystic Exploration Club')) state.clubChoice = 'Mystic Exploration Club';
      else if (context.includes('Alchemical Cuisine Club')) state.clubChoice = 'Mythic Feastmasters Guild';
      else if (context.includes('Sonic Resonance Club')) state.clubChoice = 'Harmonic Enchanters Symphony';
      else if (context.includes('Logic Circuitry Club')) state.clubChoice = 'Rune Enigma Assembly';
      else if (context.includes('None Club')) state.clubChoice = 'Solitary Arcana Wanderer';
    }
    // Lingering warning - for auto-advance prompt
    state.lingerCounter = (state.lingerCounter || 0) + 1;
    if (state.lingerCounter > 3) {
      append += '\n[WARNING BELL: Time is running out—hurry or the period will end soon, advancing to the next one automatically.]';
      state.lingerCounter = 0; // Reset after warning
    }
    // Backstory blend - ties to player inputs
    if (state.playerBackstory && context.includes('yearning') || context.includes('regret')) {
      append += '\n[Blend backstory: Infuse my internal thoughts with subtle yearning from past isolation, driving quiet pursuit of connections without overt exposition.]';
    }
    // Period advance - auto on intents or cycles
    if (context.includes('advance time') || state.timeCycle % 5 === 0) {
      advancePeriod();
      append += '\n[Period advances to ' + state.currentPeriod + '; describe transition subtly, introducing potential encounters based on location.]';
    }
    // Suitor generation - on new encounters
    if (context.includes('meet') || context.includes('encounter') || context.includes('new person')) {
      const newSuitor = generateSuitor(state.suitorGender);
      state.suitorLedger.push(newSuitor);
      state.newSuitor = newSuitor.name; // Flag for profile dump in output
      append += '\n[New Suitor: Introduce ' + newSuitor.name + ' dynamically with traits echoing themes; start at Acquaintance level, integrate fetishes post-Friend if darkThemes.]';
    }
    // Bond appends - for progression prompts
    const currentGirl = parseCurrentGirl(context);
    if (currentGirl) {
      const level = state.bondLevel[currentGirl] || 0;
      if (level >= 4 && random(0,99) < 30) {
        append += '\n[Suggest date: Propose a romantic outing tied to suitor likes/traits for bond boost.]';
      }
      if (level >= 6) {
        append += '\n[Intimacy hint: If escalating, depict consensual, emotional scene with sensory depth, tying to fetishes subtly post-Friend.]';
      }
    }
    // Dedicated fetish block - chance-based in scenes, conditional on bond to reduce bloat
    if (currentGirl && state.bondLevel[currentGirl] >= 1 && (context.includes('intimate') || context.includes('escalating') || random(0,99) < 50)) {
      const suitor = state.suitorLedger.find(s => s.name === currentGirl);
      if (suitor && suitor.traits.fetishes.length > 0) {
        const fetish = suitor.traits.fetishes[random(0, suitor.traits.fetishes.length - 1)];
        append += ' [Weave one complementary fetish (' + fetish + ') from ' + currentGirl + '\'s list subtly and consensually, tied to traits/mental health for emotional depth—only in intimate/escalating moments.]';
      }
    } else if (currentGirl && state.bondLevel[currentGirl] >= 2) {
      append += ' [If no fetish triggered this scene, hint at one subtly via dialog/emotion tied to traits, ensuring consensual emergence.]';
    }
    // Dedicated mental health block - chance-based in scenes, conditional on bond
    if (currentGirl && state.bondLevel[currentGirl] >= 1 && (context.includes('emotional') || context.includes('vulnerable') || random(0,99) < 20)) {
      const suitor = state.suitorLedger.find(s => s.name === currentGirl);
      if (suitor) append += ' [Depict ' + currentGirl + '\'s mental health trait (' + suitor.traits.mentalHealth + ') humanly in emotional/vulnerable scenes, allowing gradual resolution through player tenderness and interactions, tied to flaws/traits for added depth.]';
    }
    // Dark turn trigger for depth, conditional on mental health
    if (currentGirl && state.bondLevel[currentGirl] >= 1 && ['depressed', 'traumatized', 'borderline patterns'].includes(state.suitorLedger.find(s => s.name === currentGirl)?.traits.mentalHealth) && (context.includes('vulnerable') || context.includes('emotional') || random(0,99) < 15)) {
      append += ' [Initiate a resolvable dark turn for ' + currentGirl + ' tied to mentalHealth/flaws (e.g., moment of despair)—provide player paths for resolution via tenderness/dialog/intervention, leading to bond boost (+1-2) on success, ensuring positive resolution/no bad endings.]';
    }
    // Teacher interactions - specific handling
    if (currentGirl && (currentGirl.toLowerCase().includes('professor') || context.toLowerCase().includes('teacher'))) {
      append += ' [Teacher Interaction: Portray as supportive mentor resolving issues positively with tenderness/player input; enforce boundaries in power dynamics, de-escalate any tensions to mutual growth, tie to traits if darkThemes for depth—allow romance if preference permits but consensual only.]';
    }
    // Drift redirect - steers negatives back
    const driftKeywords = ['fight', 'leave', 'end', 'hate'];
    if (driftKeywords.some(k => context.toLowerCase().includes(k)) && detectSentiment(context) !== 'positive') {
      append += ' [Redirect: Gently steer back to romance/academy focus with positive resolution; enforce no bad endings—dark turns resolve into deeper connections if opt-in, tying to traits/mental health for depth.]';
    }
    // Update memory context - combines with appends
    state.memory.context = (state.memory.context || context.slice(0, info.memoryLength)) + append;
    return {text: state.memory.context + context.slice(info.memoryLength), stop};
  } catch (e) {
    append += ' [Error: ' + e + ']'; // Error handling
    return {text: append, stop};
  }
};
modifier(text)
