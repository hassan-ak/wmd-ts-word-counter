// Display results in a table

import Table from 'cli-table';
import { FinalResult } from './analyze.js';

/**************************************************************************/
// Function to display a table of results
async function resultTable(results: FinalResult) {
  return new Promise((resolve, reject) => {
    // Create a table instance to display results
    var operatorsTable = new Table({
      head: ['Sr. #', 'Description', 'Count'],
    });
    let operations: string[][] = [
      ['01', 'Total number of words', results.wordCount.toString()],
      ['02', 'Total number of characters', results.charcCount.toString()],
      ['03', 'Total number of alphabets', results.alphabetCount.toString()],
      [
        '04',
        'Total number of numeric characters',
        results.numberCount.toString(),
      ],
      [
        '05',
        'Total number of unique words',
        results.uniqueWordsCount.toString(),
      ],
      [
        '06',
        'Total number of unique alphabets',
        results.uniqueAlphsCount.toString(),
      ],
    ];
    operatorsTable.push(...operations);
    console.log(operatorsTable.toString());
    setTimeout(() => {
      console.log(' ');
      resolve(true);
    }, 1000);
  });
}

/**************************************************************************/
export { resultTable };
