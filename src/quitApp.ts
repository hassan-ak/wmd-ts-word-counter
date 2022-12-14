// Quit app message
import chalk from 'chalk';

/**********************************************************************/
// Displays a message before closing app
// clear console
function quitApp(): void {
  console.log(chalk.bgRed('\nClosing Word Counter, please wait...'));
  setTimeout((): void => {
    console.clear();
  }, 1500);
}

/**********************************************************************/
export { quitApp };
