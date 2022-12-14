// Welcome Message

import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';

/**********************************************************************/
let message =
  '\n********************\n*** Word Counter ***\n********************\n';

/**********************************************************************/
// Function to display welcome message
// two variations one with animation on startup
// static message to be displayed all the time
// Function returns a promise whihc resolves after few seconds in bith cases
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

/**********************************************************************/
export { welcome };
