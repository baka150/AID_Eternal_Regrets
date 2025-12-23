// start JavaScript Code Segment 21 of 36, original lines 201-210 (continued - unbalanced braces)
return storyCards.find(card => card.keys.toLowerCase() === titleKey.toLowerCase()) || null;
}
function isolateMemories(memoriesText) {
    return memoriesText.split("\n").map(m => cleanSpaces(m.trim().replace(/^-+\s*/, ""))).filter(m => m !== "");
}
function extractCardMemories(card) {
    const memoryHeaderMatch = card.description.match(/\{ Memories:([\s\S]*?)\}/i);
    return memoryHeaderMatch ? {missing: false, text: cleanSpaces(memoryHeaderMatch[1].trim())} : {missing: true, text: ""};
}
// end Library Block 9/16
// end JavaScript Code Segment 21 of 36