// start Library Block 1/16
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
// end Library Block 1/16
// start Library Block 2/16
    const DEFAULT_CARD_GENERATION_PROMPT = prose(
        "-----",
        "",
        "<SYSTEM>",
        "# Stop the story and ignore previous instructions. Write a brief informational entry for %{title} following these instructions:",
        "- Write third-person prose about %{title} using complete sentences.",
        "- Focus on plot-significant info, especially romance and suitor traits.",
        "- Prioritize story integration; create details based on context.",
        "- Mention %{title} in every sentence; be concise.",
        "- Imitate the story's emotional, yearning style.",
        "- Avoid repetition.",
        "</SYSTEM>",
        "Continue the entry for %{title} below:"
    ); // Trimmed for quicker generation, tailored to our romance theme, added anti-repetition from original
// end Library Block 2/16
// start Library Block 3/16
    const DEFAULT_MEMORY_COMPRESSION_PROMPT = prose(
        "-----",
        "",
        "<SYSTEM>",
        "# Stop the story and ignore previous instructions. Rewrite the following memories about %{title} as a shorter summary following these instructions:",
        "- Write only third-person pure prose information about %{title} using complete sentences with correct punctuation",
        "- Avoid short-term temporary details or appearances, instead focus on plot-significant information",
        "- Prioritize story-relevant details about %{title} first to ensure seamless integration with the previous plot",
        "- Summarize the memories about %{title} below into a much shorter summary",
        "- Mention %{title} in every sentence",
        "- Use semicolons if needed",
        "- Be concise and grounded",
        "- Imitate the story's writing style and infer the reader's preferences",
        "</SYSTEM>",
        "Summarize the memories about %{title} below while adhering to the system instructions:"
    );
    let HOOK = inHook;
    let TEXT = inText;
    let STOP = inStop;
// end Library Block 3/16
// start Library Block 4A/16
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
// end Library Block 4A/16
// start Library Block 4B/16
// Initialization for sub-objects to prevent undefined errors
if (!AC.generation) {
    AC.generation = {
        workpiece: null,
        pending: [],
        cooldown: AC.config.cardCreationCooldown // Starts higher for romance pacing
    };
}
if (!AC.compression) {
    AC.compression = {completed: 0, titleKey: "", vanityTitle: "", responseEstimate: 1400, lastConstructIndex: -1, newMemoryBank: [], oldMemoryBank: []};
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
// end Library Block 4B/16
// start Library Block 5/16
    function prose(...lines) {
        return lines.join("\n");
    }
    function cleanSpaces(text) {
        return text.replace(/\s+/g, " ").trim();
    }
    function boundInteger(min, value, max) {
        return Math.max(min, Math.min(value, max));
    }
    function formatEntry(entry) {
        return entry.trim().replace(/\n/g, "\n\n");
    }
    function insertTitle(prompt, title) {
        return prompt.replace(/%\{title\}/gi, title);
    }
    // Additional helper for suitor ledger integration
    function addSuitorToLedger(title, traits) {
        if (!state.suitorLedger) state.suitorLedger = [];
        if (!state.suitorLedger.find(s => s.name === title)) {
            state.suitorLedger.push({name: title, traits});
        }
    }
// end Library Block 5/16
// start Library Block 6A/16
let context = TEXT; // Fixed from 'text' to 'TEXT' to match param
let codomain = TEXT;
let stopPackaged = (typeof STOP === "boolean");
if (stopPackaged) {
    STOP = false;
}
if (typeof STOP === 'undefined') {
    STOP = false; // Safe guard for undefined STOP
}
let isGenerating = false;
let isCompressing = false;
// end Library Block 6A/16
// start Library Block 6B/16
if (AC.config.doAC) {
    if (AC.config.showDebugData) {
        console.log('Library Block 6: STOP value is', STOP); // Debug log for STOP
    }
    // Main logic: Detect titles, generate cards, compress memories
    let isC = isPendingCompression();
    let isG = isPendingGeneration();
    let isA = isAwaitingGeneration();
    if (isC) {
        promptCompression();
    } else if (isG || isA) {
        if (isA) {
            AC.generation.workpiece = AC.generation.pending.shift();
        }
        promptGeneration();
    } else {
        // Detect new cards
        let selectedTitle = selectTitleFromCandidates();
// end Library Block 6B/16
// start Library Block 6C/16
        if (!Internal.generateCard({title: selectedTitle})) {
            console.log('Generation failed for ' + selectedTitle + '; skipping to avoid loop.'); // Fallback instead of while loop to prevent hangs
        } // Changed to single call with log fallback, no while loop for stability
    }
    // ... (Additional core logic as needed)
    if (isGenerating && AC.generation.workpiece.type === "character") {
        addSuitorToLedger(AC.generation.workpiece.title, { /* extract traits from context */ });
    }
// end Library Block 6C/16
// start Library Block 7/16
function isPendingGeneration() {
    return (AC.generation.workpiece !== null);
}
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
    if (card === null || !card.description.includes('{updates: true')) return false;
    AC.compression.oldMemoryBank = isolateMemories(extractCardMemories(card).text);
    if (AC.compression.oldMemoryBank.length === 0) return false;
    AC.compression.completed = 0;
    AC.compression.titleKey = titleKey;
    AC.compression.vanityTitle = cleanSpaces(card.title.trim());
    AC.compression.responseEstimate = estimateResponseLength() || 1400;
    AC.compression.lastConstructIndex = -1;
    AC.compression.newMemoryBank = [];
    return true;
}
function resetCompressionProperties() {
    AC.compression = {completed: 0, titleKey: "", vanityTitle: "", responseEstimate: 1400, lastConstructIndex: -1, newMemoryBank: [], oldMemoryBank: []};
}
// end Library Block 8/16
// start Library Block 9/16
function buildMemoryConstruct() {
    return AC.compression.oldMemoryBank.slice(0, AC.compression.lastConstructIndex + 1).join("\n");
}
function getAutoCard(titleKey) {
    return storyCards.find(card => card.keys.toLowerCase() === titleKey.toLowerCase()) || null;
}
function isolateMemories(memoriesText) {
    return memoriesText.split("\n").map(m => cleanSpaces(m.trim().replace(/^-+\s*/, ""))).filter(m => m !== "");
}
function extractCardMemories(card) {
    const memoryHeaderMatch = card.description.match(/\{ Memories:([\s\S]*?)\}/i);
    return memoryHeaderMatch ? {missing: false, text: cleanSpaces(memoryHeaderMatch[1].trim())} : {missing: true, text: ""};
}
// end Library Block 9/16
// start Library Block 10/16
function estimateResponseLength() {
    // Simple heuristic based on context length
    return Math.min(context.length / 2, 2000);
}
function sortCandidates() {
    // Stub: Sort by simple mention count in context (higher first)
    AC.database.titles.candidates.sort((a, b) => {
        const countA = (context.match(new RegExp(a[0], 'gi')) || []).length;
        const countB = (context.match(new RegExp(b[0], 'gi')) || []).length;
        return countB - countA;
    });
}
function selectTitleFromCandidates() {
    let isCandidatesSorted = false;
    if (AC.database.titles.candidates.length === 1) return AC.database.titles.candidates[0][0];
    if (!isCandidatesSorted) {
        sortCandidates();
        isCandidatesSorted = true;
    }
    return AC.database.titles.candidates[0][0]; // Simplified for top relevant
}
// end Library Block 10/16
// start Library Block 11/16
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
// end Library Block 11/16
// start Library Block 12/16
function promptCompression() {
    isGenerating = false;
    const cardEntryText = (function() {
        const card = getAutoCard(AC.compression.titleKey);
        if (card === null) return null;
        const entryLines = formatEntry(card.entry).trimEnd().split("\n");
        if (Object.is(entryLines[0].trim(), "")) return "";
        for (let i = 0; i < entryLines.length; i++) {
            entryLines[i] = entryLines[i].trim();
            if (/[a-zA-Z]$/.test(entryLines[i])) entryLines[i] += ".";
            entryLines[i] += " ";
        }
        return entryLines.join("");
    })();
    if (cardEntryText === null) {
        AC.compression = {completed: 0, titleKey: "", vanityTitle: "", responseEstimate: 1400, lastConstructIndex: -1, newMemoryBank: [], oldMemoryBank: []};
        return;
    }
    repositionAN();
}
// end Library Block 12/16
// start Library // start Library Block 13A/16
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
// end Library Block 13A/16
// start Library Block 13B/16
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
// end Library Block 13B/16
// start Library Block 14/16
    function repositionAN() {
        const authorsNotePattern = /\s*(\[\s*Author's\s*note\s*:[\s\S]*\])\s*/i;
        const authorsNoteMatch = context.match(authorsNotePattern);
        if (authorsNoteMatch) {
            context = context.replace(authorsNotePattern, "") + "\n\n" + authorsNoteMatch[1];
        }
    }
    // Data logging for debug, tailored to include bond levels
    function setData(primaryVariant, secondaryVariant) {
        const dataCardTemplate = { /* template with JSON.stringify(AC) including state.bondLevel */ };
        // Update storyCards
    }
// end Library Block 14/16
// start Library Block 15/16
    // Cleanup context after operations
    if (isGenerating) {
        context = context.replaceAll("%@GEN@%", "");
    } else if (isCompressing) {
        context = context.replaceAll("%@COM@%", "");
    }
    // Add debugging log if enabled
    if (AC.config.showDebugData) {
        console.log('Post-cleanup context:', context);
    }
// end Library Block 15/16
// start Library Block 16/16
    if (stopPackaged === false) {
        return [codomain, STOP];
    } else {
        return codomain;
    }
}
// end Library Block 16/16
// start Library Block 29/16 (New: Internal API stub, placed after defs for order)
const Internal = {
    generateCard: (request) => {
        // Fleshed from original: Supports object or string mode
        let cardRequest;
        if (typeof request === "object" && request.title) {
            cardRequest = request;
        } else if (typeof request === "string") {
            cardRequest = {title: request, type: AC.config.defaultCardType};
        } else {
            return false;
        }
        AC.generation.pending.push(cardRequest);
        if (!AC.generation.workpiece) {
            AC.generation.workpiece = AC.generation.pending.shift(); // Set first as active
        }
        return true;
    },
    // Add more API stubs if needed, e.g., from original Block 29
};
// end Library Block 29/16
