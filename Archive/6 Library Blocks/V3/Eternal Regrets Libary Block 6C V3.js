// start block 6C/16
        if (!Internal.generateCard({title: selectedTitle})) {
            console.log('Generation failed for ' + selectedTitle + '; skipping to avoid loop.'); // Fallback instead of while loop to prevent hangs
        } // Changed to single call with log fallback, no while loop for stability
    }
    // ... (Additional core logic as needed)
    if (isGenerating && card.type === "character") {
        addSuitorToLedger(AC.generation.workpiece.title, { /* extract traits from context */ });
    }
}
// end block 6C/16
