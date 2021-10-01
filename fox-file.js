#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const CALL_DIR = process.cwd(); // Dir the script is called from 

let fo = undefined;
let registeredExtensions = {};
try {
  fo = require(path.join(CALL_DIR, "fileOptions.js"));
  fo.registerExtensions({
    addExtension: (extension, callback) => {
      registeredExtensions[extension] = callback;
    }
  });
} catch {}

function main() {
  // Get command line arg
  const relativeDir = getCommandLineArg();
  const rootDirName = relativeDir;
  const rootDirPath = path.join(CALL_DIR, relativeDir);

  // Get directory recursive directory contents as an object 
  const dirObject = getDirectoryObject(rootDirName, rootDirPath);

  let exportStatement = `module.exports = ${rootDirName};`
  let fileContents = `let ${rootDirName} = ${JSON.stringify(dirObject, null, 4)}; ${exportStatement}`;

  // Save to file
  const writeFilePath = path.join(CALL_DIR, `${rootDirName}.js`);
  fs.writeFileSync(writeFilePath, fileContents);
}

main();

function getDirectoryObject(rootDirName, rootDirPath) {

  // Recursively parse all directories under root and return directoryObject
  const parseAllDirectories = function(dirPath) {
    const files = fs.readdirSync(dirPath);
    let directoryObject = {};
  
    files.forEach(function(fileOrDirName) {
      if (fs.statSync(path.join(dirPath, path.sep, fileOrDirName)).isDirectory()) {
        directoryObject[fileOrDirName] = parseAllDirectories(path.join(dirPath, path.sep, fileOrDirName));
      } else {
        let fileObject = {
          ...parseFile(path.join(dirPath, path.sep, fileOrDirName))
        };
        directoryObject[fileOrDirName] = fileObject;
      }
    });
  
    return directoryObject;
  }

  let rootDirectoryObject = {};
  rootDirectoryObject[rootDirName] = parseAllDirectories(rootDirPath);

  return rootDirectoryObject;
}

// Helper functions

function getCommandLineArg() {
  if (process.argv.length > 2) {
    return process.argv[2];
  } else {
    throw "Root directory required: node fileFox <directory name>";
  }
}

function parseFile(relativeFilePath) {
  const fileName = getNameFromFilePath(relativeFilePath);
  const fileExtension = getExtensionFromFilePath(relativeFilePath);

  let fileString;
  try {
    fileString = String.fromCharCode(...fs.readFileSync(relativeFilePath));
  } catch(e) { console.log(e); }

  if (fo && fileExtension in registeredExtensions) {
    return registeredExtensions[fileExtension](fileName, fileString);
  }

  return { contents: fileString };
}

function getNameFromFilePath(filePath) {
  const fileList = filePath.split(path.sep);
  const fileName = fileList[fileList.length - 1];
  const lastIndex = fileName.lastIndexOf(".");
  return fileName.substr(0, lastIndex);
}

function getExtensionFromFilePath(filePath) {
  const lastIndex = filePath.lastIndexOf(".");
  return filePath.substr(lastIndex, filePath.length - 1);
}