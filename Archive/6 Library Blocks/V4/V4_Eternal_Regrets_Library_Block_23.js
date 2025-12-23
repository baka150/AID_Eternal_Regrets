// start JavaScript Code Segment 23 of 36, original lines 221-230 (continued - unbalanced braces)
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
// end JavaScript Code Segment 23 of 36