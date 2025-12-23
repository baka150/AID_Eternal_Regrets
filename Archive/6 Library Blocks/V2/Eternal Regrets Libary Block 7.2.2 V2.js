// start block 7.2.2/10
    context = context.trimEnd() + "\n\n" + cardEntryText + (
        [...AC.compression.newMemoryBank, ...AC.compression.oldMemoryBank].join(" ")
    ) + "%@COM@%\n\n" + (function() {
        const memoryConstruct = (function() {
            if (AC.compression.lastConstructIndex === -1) {
                for (let i = 0; i < AC.compression.oldMemoryBank.length; i++) {
                    AC.compression.lastConstructIndex = i;
                    const memoryConstruct = buildMemoryConstruct();
                    if (((AC.config.memoryCompressionRatio / 10) * AC.compression.responseEstimate) < memoryConstruct.length) {
                        return memoryConstruct;
                    }
                }
            } else {
                return buildMemoryConstruct();
            }
        })();
        const precursorPrompt = insertTitle(AC.config.compressionPrompt, AC.compression.vanityTitle).trim();
        const memoryPlaceholderPattern = /(?:[%\$]+\s*|[%\$]*){+\s*memor(y|ies)\s*}+/gi;
        if (memoryPlaceholderPattern.test(precursorPrompt)) {
            return precursorPrompt.replace(memoryPlaceholderPattern, memoryConstruct);
        } else {
            return precursorPrompt + "\n\n" + memoryConstruct;
        }
    })() + "\n\n";
    isCompressing = true;
}
// end block 7.2.2/10
