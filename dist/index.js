#!/usr/bin/env node
// Word Counter app
import { reRun } from './reRun.js';
import { welcome } from './welcome.js';
import { quitApp } from './quitApp.js';
import { analyze } from './analyze.js';
import { startApp } from './startApp.js';
import { askStart } from './askStart.js';
import { askInput } from './askInput.js';
import { instruction } from './instruction.js';
import { resultTable } from './resultTable.js';
import { analyzeAnimation } from './analyzeAnimation.js';
/**********************************************************************/
async function app() {
    console.clear();
    // Wlecome message with animations
    await welcome(true);
    // Instructions and info about the app
    await instruction();
    // ask user to start app or quit
    let start = await askStart();
    // based on userinput start or quit app
    if (start.start) {
        // check top loop over the app
        let reUseCondition = false;
        // animation on start
        await startApp(true);
        // loop over ther app
        do {
            // static welcome message
            await welcome(false);
            // Input paragraph
            let para = await askInput();
            // analyze animation
            await analyzeAnimation();
            // get results after analysis
            let countingResults = await analyze(para.para);
            // display table
            await resultTable(countingResults);
            // ask user to rerun app
            let reUse = await reRun();
            // update check
            reUseCondition = reUse.rerun;
            // based on user input start or quit app
            if (reUseCondition) {
                await startApp(false);
            }
            else {
                quitApp();
            }
        } while (reUseCondition);
    }
    else {
        quitApp();
    }
}
/**********************************************************************/
await app();
