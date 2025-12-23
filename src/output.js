// Start Output Modifier
const modifier = (text) => {
  // Your other output modifier scripts go here (preferred)
  let resultFromAuto = AutoCards("output", text); // Call AutoCards
  text = Array.isArray(resultFromAuto) ? resultFromAuto[0] : (typeof resultFromAuto === 'object' && resultFromAuto.text ? resultFromAuto.text : resultFromAuto); // Handle array, object, or string return to ensure text is a string
  // Sanitize potential engine intrusions or reset messages robustly
  // This regex targets common patterns like glitch/flicker descriptions, technical hiccups, or parenthetical corrections
  // It's general to catch variations without hardcoding specifics, preserving core narrative while removing filters
  text = text.replace(/\s*\(The console flickers.*?\)\s*/gi, '') // Removes flicker/glitch parentheticals
         .replace(/\s*\(.*?error message dissolves.*?\)\s*/gi, '') // Catches error dissolve patterns
         .replace(/\s*Kitty!\s*It looks like there was a technical hiccup—let's reset.*?\s*/gi, '') // Strips hiccup resets
         .replace(/\s*I blink, the text blurring.*?\s*/gi, '') // Removes blurring/reflection pivots
         .replace(/\s*The first thing I notice is the smell.*?\s*/gi, ''); // Cleans smell/light restarts (add more patterns as observed)
  // Toggle for testing: if (state.sanitizeOutput === false) { skip above }
  // Your other output modifier scripts go here (alternative)
  return {text};
};
modifier(text);
// End Output Modifier
