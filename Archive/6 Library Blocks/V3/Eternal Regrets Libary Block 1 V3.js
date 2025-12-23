// start block 1/16
function AutoCards(inHook, inText, inStop) {
    "use strict";
    const DEFAULT_DO_AC = false; // Changed to false to avoid overloading at start for better pacing
    const DEFAULT_PIN_CONFIGURE_CARD = true;
    const DEFAULT_CARD_CREATION_COOLDOWN = 50; // Increased from 30 to 50 for slower initial pacing, reducing start delays
    const DEFAULT_USE_BULLETED_LIST_MODE = false; // Prose for emotional depth
    const DEFAULT_GENERATED_ENTRY_LIMIT = 1000; // Longer for suitor details
    const DEFAULT_NEW_CARDS_DO_MEMORY_UPDATES = true;
    const DEFAULT_NEW_CARDS_MEMORY_LIMIT = 3500;
    const DEFAULT_MEMORY_COMPRESSION_RATIO = 30;
    const DEFAULT_IGNORE_ALL_CAPS_TITLES = true;
    const DEFAULT_DETECT_TITLES_FROM_INPUTS = true; // Include inputs for player actions
    const DEFAULT_MINIMUM_LOOK_BACK_DISTANCE = 8;
    const DEFAULT_DO_LSI_V2 = false; // Unused, kept false
    const DEFAULT_SHOW_DEBUG_DATA = false;
// end block 1/16
