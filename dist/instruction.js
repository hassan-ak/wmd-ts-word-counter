// Instruction for using the app
import chalk from 'chalk';
/**********************************************************************/
// Function to display instructions regarding input and output
// returns a promise whihc resolves after 0.5 sec
async function instruction() {
    return new Promise((resolve) => {
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
/**********************************************************************/
export { instruction };
