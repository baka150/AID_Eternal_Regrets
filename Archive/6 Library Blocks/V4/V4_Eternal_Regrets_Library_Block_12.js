// start JavaScript Code Segment 12 of 36, original lines 111-120 (continued - unbalanced braces)
return entry.trim().replace(/\n/g, "\n\n");
    }
    function insertTitle(prompt, title) {
        return prompt.replace(/%\{title\}/gi, title);
    }
    // Additional helper for suitor ledger integration
    function addSuitorToLedger(title, traits) {
        if (!state.suitorLedger) state.suitorLedger = [];
        if (!state.suitorLedger.find(s => s.name === title)) {
            state.suitorLedger.push({name: title, traits});
// end JavaScript Code Segment 12 of 36