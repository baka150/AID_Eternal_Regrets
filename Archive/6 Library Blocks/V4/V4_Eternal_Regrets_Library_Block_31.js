// start JavaScript Code Segment 31 of 36, original lines 301-310 (continued - unbalanced braces)
// start Library Block 14/16
    function repositionAN() {
        const authorsNotePattern = /\s*(\[\s*Author's\s*note\s*:[\s\S]*\])\s*/i;
        const authorsNoteMatch = context.match(authorsNotePattern);
        if (authorsNoteMatch) {
            context = context.replace(authorsNotePattern, "") + "\n\n" + authorsNoteMatch[1];
        }
    }
    // Data logging for debug, tailored to include bond levels
    function setData(primaryVariant, secondaryVariant) {
// end JavaScript Code Segment 31 of 36