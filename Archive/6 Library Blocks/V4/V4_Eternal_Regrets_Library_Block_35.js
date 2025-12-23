// start JavaScript Code Segment 35 of 36, original lines 341-350 (continued - unbalanced braces)
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
// end JavaScript Code Segment 35 of 36