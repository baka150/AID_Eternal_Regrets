// start block 7/16
function isPendingGeneration() {
    return (AC.generation.workpiece !== null);
}
function isAwaitingGeneration() {
    return (0 < AC.generation.pending.length);
}
function isPendingCompression() {
    return (AC.compression.completed < AC.compression.oldMemoryBank.length);
}
// end block 7/16
