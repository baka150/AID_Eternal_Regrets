// start block 5/10
    function prose(...lines) {
        return lines.join("\n");
    }
    function cleanSpaces(text) {
        return text.replace(/\s+/g, " ").trim();
    }
    function boundInteger(min, value, max) {
        return Math.max(min, Math.min(value, max));
    }
    function formatEntry(entry) {
        return entry.trim().replace(/\n/g, "\n\n");
    }
    function insertTitle(prompt, title) {
        return prompt.replace(/%\{title\}/gi, title);
    }
    // Additional helper for suitor ledger integration
    function addSuitorToLedger(title, traits) {
        if (!state.suitorLedger.find(s => s.name === title)) {
            state.suitorLedger.push({name: title, traits});
        }
    }
// end block 5/10
