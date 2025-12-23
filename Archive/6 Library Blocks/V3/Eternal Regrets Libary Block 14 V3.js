// start block 14/16
    function repositionAN() {
        const authorsNotePattern = /\s*(\[\s*Author's\s*note\s*:[\s\S]*\])\s*/i;
        const authorsNoteMatch = context.match(authorsNotePattern);
        if (authorsNoteMatch) {
            context = context.replace(authorsNotePattern, "") + "\n\n" + authorsNoteMatch[1];
        }
    }
    // Data logging for debug, tailored to include bond levels
    function setData(primaryVariant, secondaryVariant) {
        const dataCardTemplate = { /* template with JSON.stringify(AC) including state.bondLevel */ };
        // Update storyCards
    }
// end block 14/16
