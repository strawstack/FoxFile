function registerExtensions(fileFox) {

    fileFox.addExtension('.js', (fileName, fileContents) => {
        let fileObject = {
            "contents": fileContents
        };

        //
        //  NOTE: Add custom properties to fileObject here 
        //

        // Here's an example
        fileObject["lines"] = fileContents.split("\n").length;

        return fileObject;
    });

    fileFox.addExtension('.txt', (fileName, fileContents) => {
        let fileObject = {
            "contents": fileContents
        };

        //
        //  NOTE: Add custom properties to fileObject here 
        //

        return fileObject;
    });

    fileFox.addExtension('.md', (fileName, fileContents) => {
        let fileObject = {
            "contents": fileContents
        };

        //
        //  NOTE: Add custom properties to fileObject here 
        //

        return fileObject;
    });

}

module.exports = { registerExtensions };