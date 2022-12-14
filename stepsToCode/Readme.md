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
