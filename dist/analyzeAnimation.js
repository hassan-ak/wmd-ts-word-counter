// Animation before analyzing
import ora from 'ora';
import chalk from 'chalk';
/**********************************************************************/
// Create an animation with Ora
// Display for some time
// Then stops
// Clear screen
function analyzeAnimation() {
    return new Promise((resolve) => {
        console.log('');
        const spinner = ora(chalk.green(' Analyzing... '));
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
