// start block 3/10
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
// end block 3/10
