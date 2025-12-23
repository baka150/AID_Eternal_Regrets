// start block 9/10
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
// end block 9/10
