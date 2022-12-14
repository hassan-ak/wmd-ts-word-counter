// Animation before analyzing
import ora, { Ora } from 'ora';
import chalk from 'chalk';

/**********************************************************************/
// Create an animation with Ora
// Display for some time
// Then stops
// Clear screen
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

/**********************************************************************/
export { analyzeAnimation };