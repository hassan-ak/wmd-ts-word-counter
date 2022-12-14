# Steps to code CLI Word Counter

### 1. Project initiation

- Create and navigate to project directory using following commands

  ```cmd
  mkdir wmd-ts-word-counter
  cd wmd-ts-word-counter
  ```

- Intilize a node project in the newly created directory using following command, this will create a `package.json` file.

  ```cmd
  npm init -y
  ```

- Create a `tsconfig.json` file to define typescript configration using following command

  ```cmd
  tsc --init
  ```

- Create two more directories to be used as root and out directory using

  ```cmd
  mkdir src
  mkdir dist
  ```

- Update `tsconfig.json` to include above directories and also change module and moduleResolution

  ```json
  "target": "ES2022",
  "module": "NodeNext",
  "rootDir": "./src",
  "moduleResolution": "NodeNext",
  "outDir": "./dist",
  ```

- Update `package.json` and add following content to it

  ```json
  "main": "./dist/index.js",
  "type": "module",
  "scripts": {
      "start": "node ."
  },
  "bin": "./dist/index.js",
  ```

### 2. Install dependencies

- Multiple third-party packages to be used in this project so install different dependacies using following commands

  ```cmd
  npm install chalk
  npm install inquirer
  npm install cli-table
  npm install nanospinner
  npm install chalk-animation
  ```

- Install types for the installed dependancies for the development using following set of commands

  ```cmd
  npm install --save-dev @types/chalk
  npm install --save-dev @types/inquirer
  npm install --save-dev @types/cli-table
  npm install --save-dev @types/chalk-animation
  ```

- After installation `package.json` file will be updated and `package-lock.json` file along with `node_modules` folder will be created. We don't need git to track newly created files and folders so create a `.gitignore` file with the following content

  ```gitignore
  node_modules
  package-lock.json
  ```

### 3. Create Hello World

- To check if everything is setup properly first create a hello world. All the typescript files should be created in `./src` directory. Create a `index.ts` file with the following content

  ```ts
  console.log('Hello World!');
  ```

- To transpile our code to javascript we can use any of the following command, one thing to rember we need to use first command every time we make a change and the second one automatically create js files on every change. So we are going to use the latter one. All the js files will be stored in the `./dist` folder as we declared in our `tsconfig.json` file earlier.

  ```cmd
  tsc
  tsc -w
  ```

- to run the js file we can use any of the following commands

  ```cmd
  node .\dist\index.js
  node .
  npm start
  ```

- If everything is right we will have a console output.

### 4. Create welcome message

- Create `welcome.ts` will the following content to display welcome message to the user

  ```ts
  import chalk from 'chalk';
  import chalkAnimation from 'chalk-animation';
  let message =
    '\n********************\n*** Word Counter ***\n********************\n';
  async function welcome(start: boolean): Promise<boolean> {
    const animation: chalkAnimation.Animation = chalkAnimation.neon(message);
    return new Promise<boolean>((resolve) => {
      if (start) {
        setTimeout(() => {
          animation.stop();
          resolve(false);
        }, 2000);
      } else {
        console.log(chalk.bold.inverse(message));
        setTimeout(() => {
          resolve(false);
        }, 1000);
      }
    });
  }
  export { welcome };
  ```

### 5. Create instructions

- Create `instructions.ts` with the following content to display information about the app

  ```ts
  import chalk from 'chalk';
  async function instruction(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      console.log(chalk.yellow('Instruction : '));
      console.log('\tInput : \n\t\tSome string or a paragraph');
      console.log('\tOutput : \n\t\tNumber of Words');
      console.log('\t\tNumber of total Characters');
      console.log('\t\tNumber of Alphabets');
      console.log('\t\tNumber of Numeric Characters');
      console.log('\t\tNumber of Unique Words');
      console.log('\t\tNumber of Unique Alphabets');
      console.log('');
      setTimeout(() => {
        resolve(true);
      }, 500);
    });
  }
  export { instruction };
  ```

### 6. Ask user to play or quit

- Create `askStart.ts` with the following content to ask user to use the app or quit with out using

  ```ts
  import inquirer from 'inquirer';
  async function askStart(): Promise<{ start: boolean }> {
    const result: { start: boolean } = await inquirer.prompt([
      {
        message: 'Do you want to use the App : ',
        type: 'confirm',
        name: 'start',
      },
    ]);
    return result;
  }
  export { askStart };
  ```

### 7. Create staring animation

- Create `startApp.ts` with the following content to display an animation before starting or re-running the app

  ```ts
  import { createSpinner } from 'nanospinner';
  async function startApp(start: boolean) {
    return new Promise<boolean>((resolve, reject) => {
      console.log('');
      let message = start ? 'starting up' : 'Re-running App';
      const spinner = createSpinner(message).start();
      setTimeout(() => {
        spinner.stop();
        console.clear();
        resolve(true);
      }, 1000);
    });
  }
  export { startApp };
  ```

### 8. Create closing message

- Create `quitApp.ts` to display a message before qutting the app

  ```ts
  import chalk from 'chalk';
  function quitApp(): void {
    console.log(chalk.bgRed('\nClosing Word Counter, please wait...'));
    setTimeout((): void => {
      console.clear();
    }, 1500);
  }
  export { quitApp };
  ```

### 9. Ask user for a paragraph

- Create `askInput.ts` to ask user for a paragraph or a any other input which is then to be analyzed

  ```ts
  import inquirer from 'inquirer';
  async function askInput(): Promise<{ para: string }> {
    const result: { para: string } = await inquirer.prompt([
      {
        message: 'Enter any paragraph : ',
        type: 'input',
        name: 'para',
        default: ' ',
      },
    ]);
    return result;
  }
  export { askInput };
  ```

### 10. Create analysis animation

- Create `analyzeAnimation.ts` to create an animataion to be displayed before displaying results

  ```ts
  import ora, { Ora } from 'ora';
  import chalk from 'chalk';
  function analyzeAnimation(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      console.log('');
      const spinner: Ora = ora(chalk.green(' Analyzing... '));
      spinner.color = 'yellow';
      spinner.start();
      setTimeout(() => {
        spinner.stop();
        resolve(true);
      }, 1500);
    });
  }
  export { analyzeAnimation };
  ```

### 11. Analyse input and get results

- create `analyze.ts` to analyse given paragraph and get results

  ```ts
  function stripPunctuation(para: string): string {
    const fromatedParagraph = para.replace(/[.,\/#!$%\^&\*;:{}?=\-_`~()]/g, '');
    return fromatedParagraph;
  }
  interface FinalResult {
    wordCount: number;
    alphabetCount: number;
    numberCount: number;
    charcCount: number;
    uniqueWordsCount: number;
    uniqueAlphsCount: number;
  }
  function counter(para: string): FinalResult {
    let charcList: string[] = [];
    let charcListRaw = para.split('');
    for (let elm of charcListRaw) {
      if (elm != ' ') {
        charcList.push(elm);
      }
    }
    let charcCount = 0;
    charcCount = charcList.length;
    let newParagraph = stripPunctuation(para);
    let wordList: string[] = [];
    let wordListraw = newParagraph.split(' ');
    for (let elm of wordListraw) {
      if (elm != '') {
        wordList.push(elm.toLowerCase());
      }
    }
    let wordCount = 0;
    wordCount = wordList.length;
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
    let uniqueWords = [...new Set(wordList)];
    let uniqueWordsCount = 0;
    uniqueWordsCount = uniqueWords.length;
    let uniqueAlphs = [...new Set(alphabetList)];
    let uniqueAlphsCount = 0;
    uniqueAlphsCount = uniqueAlphs.length;
    let finalResult: FinalResult = {
      wordCount: wordCount,
      alphabetCount: alphabetCount,
      numberCount: numberCount,
      charcCount: charcCount,
      uniqueWordsCount: uniqueWordsCount,
      uniqueAlphsCount: uniqueAlphsCount,
    };
    return finalResult;
  }
  async function analyze(para: string): Promise<FinalResult> {
    return new Promise<FinalResult>((resolve) => {
      let response = counter(para);
      resolve(response);
    });
  }
  export { analyze, FinalResult };
  ```

### 12. Create table to display results

- create `resultTable.ts` to display results in the form of a table

  ```ts
  import Table from 'cli-table';
  import { FinalResult } from './analyze.js';
  async function resultTable(results: FinalResult) {
    return new Promise((resolve, reject) => {
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
  export { resultTable };
  ```

### 13. Ask user top re-run app

- create `reRun.ts` to ask user to re run the app

  ```ts
  import inquirer from 'inquirer';
  async function reRun(): Promise<{ rerun: boolean }> {
    const result: { rerun: boolean } = await inquirer.prompt([
      {
        message: 'Do you want to re-run the app : ',
        type: 'confirm',
        name: 'rerun',
      },
    ]);
    return result;
  }
  export { reRun };
  ```

### 14. Combine all functionality

- Update `index.ts` to combine all the above said functionality

  ```ts
  #!/usr/bin/env node
  import { reRun } from './reRun.js';
  import { welcome } from './welcome.js';
  import { quitApp } from './quitApp.js';
  import { analyze } from './analyze.js';
  import { startApp } from './startApp.js';
  import { askStart } from './askStart.js';
  import { askInput } from './askInput.js';
  import { instruction } from './instruction.js';
  import { resultTable } from './resultTable.js';
  import { analyzeAnimation } from './analyzeAnimation.js';
  async function app() {
    console.clear();
    await welcome(true);
    await instruction();
    let start = await askStart();
    if (start.start) {
      let reUseCondition = false;
      await startApp(true);
      do {
        await welcome(false);
        let para = await askInput();
        await analyzeAnimation();
        let countingResults = await analyze(para.para);
        await resultTable(countingResults);
        let reUse = await reRun();
        reUseCondition = reUse.rerun;
        if (reUseCondition) {
          await startApp(false);
        } else {
          quitApp();
        }
      } while (reUseCondition);
    } else {
      quitApp();
    }
  }
  await app();
  ```

### 15. Publish as NPX package

- login to npm

  ```cmd
  npm login
  ```

- publish app

  ```cmd
  npm publish
  ```

- to update

  ```cmd
  npm version <type>
  ```

- version types

  ```
  patch
  minor
  major
  ```
