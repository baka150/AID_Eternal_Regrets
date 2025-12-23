// start block 4B/16
// Initialization for sub-objects to prevent undefined errors
if (!AC.generation) {
    AC.generation = {
        workpiece: null,
        pending: [],
        cooldown: AC.config.cardCreationCooldown // Starts higher for romance pacing
    };
}
if (!AC.compression) {
    resetCompressionProperties(); // Sets defaults
}
if (!AC.database) {
    AC.database = {
        titles: { candidates: [] }
    };
}
if (!AC.signal) {
    AC.signal = { recheckRetryOrErase: false };
}
state.AutoCards = AC; // Persist back to state
// end block 4B/16
