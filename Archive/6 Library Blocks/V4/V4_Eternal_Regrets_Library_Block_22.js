// start JavaScript Code Segment 22 of 36, original lines 211-220 (continued - unbalanced braces)
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
// end JavaScript Code Segment 22 of 36