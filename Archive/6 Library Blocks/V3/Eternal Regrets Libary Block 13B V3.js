// start block 13B/16
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
// end block 13B/16
