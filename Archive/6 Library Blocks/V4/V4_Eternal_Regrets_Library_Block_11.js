// start JavaScript Code Segment 11 of 36, original lines 101-110 (continued - unbalanced braces)
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
// end JavaScript Code Segment 11 of 36