/* Preqrequisites for uncover pattern functions  */

// 1. We assume that provided argument is an array
// 2. This array contains .tile-back class each time
// 3. This .tile-back class contains a svg with indentifier class
// 4. Identifier class is located at position 1  - index 1. 

const uncoverPatterns = {

    pairs: function(targetedTiles) {
        if(targetedTiles[0].childNodes[0].classList[1] === targetedTiles[1].childNodes[0].classList[1]) {
            return true;
        }  return false;
    },

}

export {uncoverPatterns};