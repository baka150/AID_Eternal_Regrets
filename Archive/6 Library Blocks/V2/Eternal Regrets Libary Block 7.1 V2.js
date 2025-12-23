// start block 7.1/10
function promptGeneration() {
    repositionAN();
    context = context.trimEnd() + "%@GEN@%\n\n" + (function() {
        const partialEntry = formatEntry(AC.generation.workpiece.entry);
        const entryPlaceholderPattern = /(?:[%\$]+\s*|[%\$]*){+\s*entry\s*}+/gi;
        if (entryPlaceholderPattern.test(AC.generation.workpiece.prompt)) {
            return AC.generation.workpiece.prompt.replace(entryPlaceholderPattern, partialEntry);
        } else {
            return AC.generation.workpiece.prompt.trimEnd() + "\n\n" + partialEntry;
        }
    })();
    isGenerating = true;
}
// end block 7.1/10
