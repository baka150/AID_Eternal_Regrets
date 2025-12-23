// start block 8/16
function prepareMemoryCompression(titleKey) {
    const card = getAutoCard(titleKey);
    if (card === null || !card.description.includes('{updates: true')) return false;
    AC.compression.oldMemoryBank = isolateMemories(extractCardMemories(card).text);
    if (AC.compression.oldMemoryBank.length === 0) return false;
    AC.compression.completed = 0;
    AC.compression.titleKey = titleKey;
    AC.compression.vanityTitle = cleanSpaces(card.title.trim());
    AC.compression.responseEstimate = estimateResponseLength() || 1400;
    AC.compression.lastConstructIndex = -1;
    AC.compression.newMemoryBank = [];
    return true;
}
function resetCompressionProperties() {
    AC.compression = {completed: 0, titleKey: "", vanityTitle: "", responseEstimate: 1400, lastConstructIndex: -1, newMemoryBank: [], oldMemoryBank: []};
}
// end block 8/16
