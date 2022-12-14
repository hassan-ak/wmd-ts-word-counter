// Spnier animation

import { createSpinner } from 'nanospinner';

/**********************************************************************/
// Spinerr animation displays up before starting the app
// function returns a promise whihc resolves
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

/**********************************************************************/
export { startApp };
