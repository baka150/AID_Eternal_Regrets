// start block 13A/16
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
// end block 13A/16
