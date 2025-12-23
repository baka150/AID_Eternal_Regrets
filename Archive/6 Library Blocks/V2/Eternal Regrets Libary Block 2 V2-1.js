// start block 2/10
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
        "</SYSTEM>",
        "Continue the entry for %{title} below:"
    ); // Trimmed for quicker generation, tailored to our romance theme
// end block 2/10
