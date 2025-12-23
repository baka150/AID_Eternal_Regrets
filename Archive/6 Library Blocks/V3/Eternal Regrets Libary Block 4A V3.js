// start block 4A/16
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
        doLsiV2: DEFAULT_DO_LSI_V2,
        showDebugData: DEFAULT_SHOW_DEBUG_DATA,
        cardGenerationPrompt: DEFAULT_CARD_GENERATION_PROMPT,
        compressionPrompt: DEFAULT_MEMORY_COMPRESSION_PROMPT,
        defaultCardType: "character" // Tailored for suitors
    };
}
// end block 4A/16
