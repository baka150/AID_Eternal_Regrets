// start block 6.5.3/10
function buildMemoryConstruct() {
    return AC.compression.oldMemoryBank.slice(0, AC.compression.lastConstructIndex + 1).join("\n");
}
function getAutoCard(titleKey) {
    return storyCards.find(card => card.keys.toLowerCase() === titleKey.toLowerCase()) || null;
}
function isolateMemories(memoriesText) {
    return memoriesText.split("\n").map(m => cleanSpaces(m.trim().replace(/^-+\s*/, ""))).filter(m => m !== "");
}
function extractCardMemories(card) {
    const memoryHeaderMatch = card.description.match(/\{ Memories:([\s\S]*?)\}/i);
    return memoryHeaderMatch ? {missing: false, text: cleanSpaces(memoryHeaderMatch[1].trim())} : {missing: true, text: ""};
}
// end block 6.5.3/10
