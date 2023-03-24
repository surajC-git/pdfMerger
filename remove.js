// import fsPromises from 'fs/promises'
// import path from 'path'
// if you prefer commonJS, use this:
const fsPromises = require('fs/promises');
const path = require('path')

const emptyFolder = async (folderPath) => {
    try {
        // Find all files in the folder
        const files = await fsPromises.readdir(folderPath);
        for (const file of files) {
            await fsPromises.unlink(path.resolve(folderPath, file));
        }
    } catch (err){
        console.log(err);
    }
}

// Test it
module.exports = {emptyFolder}
