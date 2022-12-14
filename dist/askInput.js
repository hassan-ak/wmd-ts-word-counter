// User Input
import inquirer from 'inquirer';
/**********************************************************************/
// Function to ask user for a string 
// returns same string to be consumed by other functions
async function askInput() {
    const result = await inquirer.prompt([
        {
            message: 'Enter any paragraph : ',
            type: 'input',
            name: "para",
            default: " "
        },
    ]);
    return result;
}
/**********************************************************************/
export { askInput };
