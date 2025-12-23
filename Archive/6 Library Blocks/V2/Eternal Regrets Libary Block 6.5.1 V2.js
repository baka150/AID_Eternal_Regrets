// start block 6.5.1/10
function isPendingGeneration() {
    return (AC.generation.workpiece !== null);
}
function isAwaitingGeneration() {
    return (0 < AC.generation.pending.length);
}
function isPendingCompression() {
    return (AC.compression.completed < AC.compression.oldMemoryBank.length);
}
// end block 6.5.1/10
