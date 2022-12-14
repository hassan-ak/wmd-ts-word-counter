// Ask user to start app
import inquirer from 'inquirer';

/**********************************************************************/
// Function to ask user for starting app
// Enter or Yes or Y to continue
// No or any other to quit
// returns true for continue and false for quit
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

/**********************************************************************/
export { askStart };
