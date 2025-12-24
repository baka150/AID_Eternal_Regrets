// Start Output Modifier
const modifier = (text) => {
  // Your other output modifier scripts go here (preferred)
  let resultFromAuto = AutoCards("output", text); // Call AutoCards
  text = Array.isArray(resultFromAuto) ? resultFromAuto[0] : (typeof resultFromAuto === 'object' && resultFromAuto.text ? resultFromAuto.text : resultFromAuto); // Handle array, object, or string return to ensure text is a string
  // Your other output modifier scripts go here (alternative)
  return {text};

};
modifier(text);
