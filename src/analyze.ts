// Analyze paragraph

/**********************************************************************/
// Function to strip the given text from almost all punctuations
// retun the same para with-out punctuations
function stripPunctuation(para: string): string {
  const fromatedParagraph = para.replace(/[.,\/#!$%\^&\*;:{}?=\-_`~()]/g, '');
  return fromatedParagraph;
}

/**********************************************************************/
// interface to define final result
interface FinalResult {
  wordCount: number;
  alphabetCount: number;
  numberCount: number;
  charcCount: number;
  uniqueWordsCount: number;
  uniqueAlphsCount: number;
}

// Counter function
// Return multiple type of counts
function counter(para: string): FinalResult {
  // Charcter Counting
  let charcList: string[] = [];
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
  let wordList: string[] = [];
  let wordListraw = newParagraph.split(' ');
  for (let elm of wordListraw) {
    if (elm != '') {
      wordList.push(elm.toLowerCase());
    }
  }
  let wordCount = 0;
  wordCount = wordList.length;
  // Alphabet + number Counting
  let alphabetList: string[] = [];
  let numberList: string[] = [];
  let alphabetListRaw = wordList.join('').split('');
  for (let elm of alphabetListRaw) {
    if (isNaN(Number(elm))) {
      alphabetList.push(elm.toLowerCase());
    } else {
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
  let finalResult: FinalResult = {
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
async function analyze(para: string):Promise<FinalResult> {
  return new Promise<FinalResult>((resolve) => {
    let response = counter(para);
    resolve(response);
  });
}

/**********************************************************************/
export { analyze, FinalResult };
