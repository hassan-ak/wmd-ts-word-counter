// Analyze paragraph
/**********************************************************************/
// Function to strip the given text from almost all punctuations
// retun the same para with-out punctuations
function stripPunctuation(para) {
    const fromatedParagraph = para.replace(/[.,\/#!$%\^&\*;:{}?=\-_`~()]/g, '');
    return fromatedParagraph;
}
// Counter function
// Return multiple type of counts
function counter(para) {
    // Charcter Counting
    let charcList = [];
    let charcListRaw = para.split('');
    for (let elm of charcListRaw) {
        if (elm != ' ') {
            charcList.push(elm);
        }
    }
    let charcCount = 0;
    charcCount = charcList.length;
    // Remove puncuations
    let newParagraph = stripPunctuation(para);
    // Word Counting
    let wordList = [];
    let wordListraw = newParagraph.split(' ');
    for (let elm of wordListraw) {
        if (elm != '') {
            wordList.push(elm.toLowerCase());
        }
    }
    let wordCount = 0;
    wordCount = wordList.length;
    // Alphabet + number Counting
    let alphabetList = [];
    let numberList = [];
    let alphabetListRaw = wordList.join('').split('');
    for (let elm of alphabetListRaw) {
        if (isNaN(Number(elm))) {
            alphabetList.push(elm.toLowerCase());
        }
        else {
            numberList.push(elm);
        }
    }
    let alphabetCount = 0;
    let numberCount = 0;
    alphabetCount = alphabetList.length;
    numberCount = numberList.length;
    // Unique words
    let uniqueWords = [...new Set(wordList)];
    let uniqueWordsCount = 0;
    uniqueWordsCount = uniqueWords.length;
    // Unique alphabets
    let uniqueAlphs = [...new Set(alphabetList)];
    let uniqueAlphsCount = 0;
    uniqueAlphsCount = uniqueAlphs.length;
    // Results
    let finalResult = {
        wordCount: wordCount,
        alphabetCount: alphabetCount,
        numberCount: numberCount,
        charcCount: charcCount,
        uniqueWordsCount: uniqueWordsCount,
        uniqueAlphsCount: uniqueAlphsCount,
    };
    // return
    return finalResult;
}
/**********************************************************************/
// Function to call counter
// returns a promise which resolves with the response from counter function
async function analyze(para) {
    return new Promise((resolve) => {
        let response = counter(para);
        resolve(response);
    });
}
/**********************************************************************/
export { analyze };
