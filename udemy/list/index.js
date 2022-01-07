#!/usr/bin/env node

import chalk from 'chalk';
import fs from 'fs';
import util from 'util';
import path from 'path'


console.log(chalk.cyan('Hello world!'));

const targetDir = process.argv[2] || process.cwd()

// //Method 1
// const lstat = (filename) => {
//     return new Promise((resolve, reject) => {
//         fs.lstat(filename, (err, stats) => {
//             if(err) {
//                 reject(err);
//             }
//             resolve(stats)
//         })
//     })
// }

//METHOD 2
// const lstat = util.promisify(fs.lstat);

//Method 3
const { lstat } = fs.promises;

fs.readdir(targetDir, async (err, filenames) => {
    if(err) {
        console.log(err);
    }

    const statPromises = filenames.map(filename => {
        return lstat(path.join(targetDir, filename));
    });

    const allStats = await Promise.all(statPromises);

    for (let stats of allStats) {
        const index = allStats.indexOf(stats);

        if(stats.isFile()) {
            console.log(chalk.bgBlueBright(filenames[index]));
        } else {
            console.log(chalk.bgGreenBright.bold(filenames[index]))
        }
    }
});
