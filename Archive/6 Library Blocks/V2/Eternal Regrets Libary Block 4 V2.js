// start block 4/10
let AC = state.AutoCards || {};
if (!AC.config) {
    AC.config = {
        doAC: DEFAULT_DO_AC,
        pinConfigureCard: DEFAULT_PIN_CONFIGURE_CARD,
        cardCreationCooldown: DEFAULT_CARD_CREATION_COOLDOWN,
        useBulletedListMode: DEFAULT_USE_BULLETED_LIST_MODE,
        generatedEntryLimit: DEFAULT_GENERATED_ENTRY_LIMIT,
        newCardsDoMemoryUpdates: DEFAULT_NEW_CARDS_DO_MEMORY_UPDATES,
        newCardsMemoryLimit: DEFAULT_NEW_CARDS_MEMORY_LIMIT,
        memoryCompressionRatio: DEFAULT_MEMORY_COMPRESSION_RATIO,
        ignoreAllCapsTitles: DEFAULT_IGNORE_ALL_CAPS_TITLES,
        detectTitlesFromInputs: DEFAULT_DETECT_TITLES_FROM_INPUTS,
        minimumLookBackDistance: DEFAULT_MINIMUM_LOOK_BACK_DISTANCE,
        doLSIv2: DEFAULT_DO_LSI_V2,
        showDebugData: DEFAULT_SHOW_DEBUG_DATA,
        generationPrompt: DEFAULT_CARD_GENERATION_PROMPT,
        compressionPrompt: DEFAULT_MEMORY_COMPRESSION_PROMPT,
        defaultCardType: "character" // Tailored for suitors
    };
}
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
// end block 4/10
