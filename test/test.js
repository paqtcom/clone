const fs = require('fs');
const fsExtra = require('fs-extra');
const resolve = require('path').resolve;
const rootDir = resolve(__dirname, '../');

// copy required package core js for the test
fs.copyFile(`${rootDir}/js/clone.core.js`, `${rootDir}/test/js/app.js`, (err) => {
    if (err) {
        throw err;
    }
    console.log('clone.core.js was copied to test/js/app.js');
});

// copy required jquery for the test
fs.copyFile(`${rootDir}/node_modules/jquery/dist/jquery.min.js`, `${rootDir}/test/js/vendor.js`, (err) => {
    if (err) {
        throw err;
    }
    console.log('jquery.min.js was copied to test/js/vendor.js');
});

// copy the test folder inside dist
fsExtra.copy(`${rootDir}/test`, `${rootDir}/dist/test`, function(err) {
    if (err) {
        return console.error(err);
    }
    console.log('test folder is copied inside dist');
});
