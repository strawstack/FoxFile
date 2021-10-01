# FoxFile

FoxFile turns file systems into data structures.

# Install via NPM

`npm install fox-file`

# Usage

`npx fox-file [directory-path]`

Replace `[directory-path]` above with a relative path to a directory starting from the directory where you are running the command. Note: do not terminate the `[directory-path]` argument with a path seperator.

### Using the fox-file Command

Let's say you run the command `npx fox-file sampleDirectory`. This means that you have a directory called `sampleDirectory` in the same directory as where you are running the command. FoxFile will "bundle" the contents of `sampleDirectory` into a single JS file with the same name as the directory, so, in this case, `sampleDirectory.js`. You can then import `sampleDirectory.js` into other JS programs as shown below.

### Importing the Generated File

If you run `fox-file` on a directory called `sampleDirectory`, a file called `sampleDirectory.js` will be generated in the directory where you ran the command. Import and use `sampleDirectory.js` in your project as follows:

```js
const ff = require("./sampleDirectory.js");

// Print top level directories and files
for (let name in ff["sampleDirectory"]) {
    console.log(name);
}

// Get contents of a specific file
console.log(ff.sampleDirectory.subDirectoryName["specific_file.txt"].contents);
```

# Customize File Parsing Behaviour by Extension

Take a look at `fileOptions.js` in the root of the [project repo](https://github.com/strawstack/FoxFile). A file like `fileOptions.js` can be placed in the location where you run the `fox-file` command. Edit the code inside `fileOptions.js` where indicated to customize FoxFile's behaviour.

# Contributors

[Richard Hayes](https://github.com/strawstack)
