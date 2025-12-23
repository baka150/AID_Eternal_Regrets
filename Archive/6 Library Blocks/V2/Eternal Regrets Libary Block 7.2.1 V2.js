// start block 7.2.1/10
function promptCompression() {
    isGenerating = false;
    const cardEntryText = (function() {
        const card = getAutoCard(AC.compression.titleKey);
        if (card === null) return null;
        const entryLines = formatEntry(card.entry).trimEnd().split("\n");
        if (Object.is(entryLines[0].trim(), "")) return "";
        for (let i = 0; i < entryLines.length; i++) {
            entryLines[i] = entryLines[i].trim();
            if (/[a-zA-Z]$/.test(entryLines[i])) entryLines[i] += ".";
            entryLines[i] += " ";
        }
        return entryLines.join("");
    })();
    if (cardEntryText === null) {
        resetCompressionProperties();
        return;
    }
    repositionAN();
}
// end block 7.2.1/10
