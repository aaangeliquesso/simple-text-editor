let currentCase = 'L'; 

function upperLowercase() {
    let textarea = document.getElementById('textbox');

    switch (currentCase) {
        case 'L': 
            textarea.value = textarea.value.toUpperCase();
            currentCase = 'U'; // Next time switch to lowercase
            break;
        case 'U': 
            textarea.value = textarea.value.toLowerCase();
            currentCase = 'L'; // Next time switch to uppercase
            break; 
    }
}



// Toggle panel visibility ------------- FIND REPLACE
function toggleFindReplace() {
    let panelFindReplace = document.getElementById('findReplacePanel');
    if (panelFindReplace.style.display === 'block') {       //if visible
        panelFindReplace.style.display = 'none';
    } else {
        panelFindReplace.style.display = 'block';           //if not visible
        document.getElementById('findInput').focus(); 
    }
}

// Toggle panel visibility  ------------- SEARCH
function toggleSearch() {
    let panelSearch = document.getElementById('searchPanel');
    if (panelSearch.style.display === 'block') {            //if visible
        panelSearch.style.display = 'none';
    } else {
        panelSearch.style.display = 'block';                //if not visible
        document.getElementById('findInput').focus(); 
    }
}

// Toggle panel visibility  ------------- WORD COUNT
function toggleWordCount() { 
    let panelWordCount = document.getElementById('wordCountPanel');
    if (panelWordCount.style.display === 'block') {         //if visible
        panelWordCount.style.display = 'none';
    } 
    else {
        panelWordCount.style.display = 'block';             //if not visible
        document.getElementById('textbox').focus(); 
        wordCount();
    }
}


//---------------------------------------------------------------------------------



// ------------- Find & Replace Text Function
function replaceText() {
    let textarea = document.getElementById('textbox'); 
    let findVal = document.getElementById('findInputForReplace').value;
    let replaceVal = document.getElementById('replaceInput').value;
    let outputSpan = document.getElementById('searchOutputFindReplace');

    if (!findVal) {
        outputSpan.textContent = 'Please enter text to find.';
        outputSpan.style.color = '#d32f2f';
        findInputForReplace.focus();
        return;
    }

    let originalText = textarea.value;
    let lowerText = originalText.toLowerCase();
    let lowerFindVal = findVal.toLowerCase();

    //check if the word exists
    if (!lowerText.includes(lowerFindVal)) {
        outputSpan.textContent = 'Text "' + findVal + '" not found.';
        outputSpan.style.color = '#d32f2f';
        replaceInput.focus();
        return;
    }

    //loop through and replace every occurrence
    let resultText = "";
    let currentIndex = 0;
    let matchIndex = lowerText.indexOf(lowerFindVal, currentIndex);

    while (matchIndex !== -1) {
        //append text before the match + the replacement string
        resultText += originalText.substring(currentIndex, matchIndex) + replaceVal;
        
        //moves index to next based sa match
        currentIndex = matchIndex + findVal.length;

        //search next occurrence starting from currentIndx
        matchIndex = lowerText.indexOf(lowerFindVal, currentIndex);

        outputSpan.textContent = 'Changes done.';
        outputSpan.style.color = '#2e7d32';
        findInputForReplace.focus();
    }

    //append any remaining text after the last match
    resultText += originalText.substring(currentIndex);

    textarea.value = resultText;
}



// ------------- Find Text Function
function findText() {
    let textarea = document.getElementById('textbox'); 
    let findInput = document.getElementById('findInput');
    let outputSpan = document.getElementById('searchOutputFind');

    let findVal = '';
    // remove spaces before and after input in textarea
    if (findInput) {
        findVal = findInput.value.trim();
    } else {
        findVal = '';
    }

    // empty find textbox
    if (!findVal) {
        outputSpan.textContent = 'Please enter text to find.';
        outputSpan.style.color = '#d32f2f';
        findInput.focus();
        return;
    }

    let lowerText = textarea.value.toLowerCase();
    let lowerFindVal = findVal.toLowerCase();

    let matches = [];       //stores the position indices
    let matchIndex = lowerText.indexOf(lowerFindVal);

    //collect all match positions
    while (matchIndex !== -1) {
        matches.push(matchIndex + 1); 
        matchIndex = lowerText.indexOf(lowerFindVal, matchIndex + findVal.length);
    }

    //display results
    if (matches.length > 0) {
        let firstIndexZeroBased = matches[0] - 1;

        if (matches.length === 1) {
            outputSpan.textContent = 'Found at position ' + matches[0] + '.';
        } else {
            outputSpan.textContent = 'Found at positions: ' + matches.join(', ') + '.';
        }

        outputSpan.style.color = '#2e7d32'; // Green

        //highlight the first match inside the textarea
        textarea.focus();
        textarea.setSelectionRange(firstIndexZeroBased, firstIndexZeroBased + findVal.length);
    } 
    else {
        outputSpan.textContent = 'No matches found for "' + findVal + '".'; 
        outputSpan.style.color = '#d32f2f'; // Red
        findInput.focus();
    }
}



// -------------Word Count Function
function wordCount() {
    let rawText = document.getElementById('textbox').value;
    let outputSpan = document.getElementById('wordCountOutput');

    //remove spaces using regex to get characters without spaces
    let chars = rawText.replace(/\s+/g, '').length;         //RESEARCH THIS

    console.log('hi');
    outputSpan.textContent = 'Characters (no spaces): ' + chars;
}



//---------------------------------------------------------------------------------


// Close panel ------------- FIND REPLACE
function closeFindReplace() {
    document.getElementById('findReplacePanel').style.display = 'none';
}

// Close panel ------------- SEARCH
function closeSearch() {
    document.getElementById('searchPanel').style.display = 'none';
}

// Close panel ------------- SEARCH
function closeWordCount() {
    document.getElementById('wordCountPanel').style.display = 'none';
}



//---------------------------------------------------------------------------------


// Change theme ------------- ALL THEMES
function changeTheme(season) {
    let toolbar = document.getElementById('toolbar');
    let textbox = document.getElementById('textbox');

    switch(season) {
        case 'spring': {
            document.body.style.backgroundImage = "url('img/springtheme.png')";
            toolbar.style.backgroundColor = "rgb(224, 247, 233)"; 
            textbox.style.borderColor = "rgb(224, 247, 233)";
            break;
        }
        case 'summer': {
            document.body.style.backgroundImage = "url('img/summertheme.png')";
            toolbar.style.backgroundColor = "rgb(255, 243, 205)"; 
            textbox.style.borderColor = "rgb(255, 243, 205)"; 
            break;
        }
        case 'fall': {
            document.body.style.backgroundImage = "url('img/falltheme.png')";
            toolbar.style.backgroundColor = "rgb(255, 230, 213)"; 
            textbox.style.borderColor = "rgb(255, 230, 213)";
            break;
        }
        case 'winter': {
            document.body.style.backgroundImage = "url('img/wintertheme.png')";
            toolbar.style.backgroundColor = "rgb(225, 245, 254)"; 
            textbox.style.borderColor = "rgb(225, 245, 254)"; 
            break;
        }
        case 'default': {
            toolbar.style.backgroundColor = "rgb(221, 254, 253)";
            textbox.style.borderColor = "rgb(221, 254, 253)";
            document.body.style.backgroundImage = "none";          
            document.body.style.backgroundColor = "rgb(35, 54, 54)";
        }
    }
}
