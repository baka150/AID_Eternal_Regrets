// start block 15/16
    // Cleanup context after operations
    if (isGenerating) {
        context = context.replaceAll("%@GEN@%", "");
    } else if (isCompressing) {
        context = context.replaceAll("%@COM@%", "");
    }
    // Add debugging log if enabled
    if (AC.config.showDebugData) {
        console.log('Post-cleanup context:', context);
    }
// end block 15/16
