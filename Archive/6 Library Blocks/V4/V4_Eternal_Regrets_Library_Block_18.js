// start JavaScript Code Segment 18 of 36, original lines 171-180 (continued - unbalanced braces)
function isAwaitingGeneration() {
    return (0 < AC.generation.pending.length);
}
function isPendingCompression() {
    return (AC.compression.completed < AC.compression.oldMemoryBank.length);
}
// end Library Block 7/16
// start Library Block 8/16
function prepareMemoryCompression(titleKey) {
    const card = getAutoCard(titleKey);
// end JavaScript Code Segment 18 of 36