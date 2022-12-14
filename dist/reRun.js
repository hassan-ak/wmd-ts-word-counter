// Ask user to start app
import inquirer from "inquirer";
/**********************************************************************/
// Function to ask user for re-running the app
// Enter or Yes or Y to continue
// No or any other to quit
// returns true for rerun and false for quit
async function reRun() {
    const result = await inquirer.prompt([
        {
            message: 'Do you want to re-run the app : ',
            type: 'confirm',
            name: 'rerun',
        },
    ]);
    return result;
}
/**********************************************************************/
export { reRun };
