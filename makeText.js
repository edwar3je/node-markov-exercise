/** Command-line tool to generate Markov text. */

// Import methods
const fs = require('fs');
const axios = require('axios');
const MarkovMachine = require('./markov.js');

// Assign values to important variables based on the argument executed in the script (upon using Node).
let format = process.argv[2];
let path = process.argv[3];

// If a legitimate format isn't placed as the third keyword, then it will return false
// The third keyword passed through the script should either be 'file' or 'url'.
// This impacts what methods are used to get text from the desired format.
function determineLegitimateFormat(arg){
    if (arg == 'file' || arg == 'url'){
        return true
    }
    return false
}

// Determines if the path provided is for a file.
function determineFile(sampleFile){
    if (sampleFile.includes('txt')){
        return true
    }
    return false
}

// Determines if the path provided is for a url/link.
function determineURL(sampleURL){
    if (sampleURL.includes('http') || sampleURL.includes('.com')){
        return true
    }
    return false
}

// Reads the file, uses data from the file to create a new instance of a MarkovMachine and generate text
// Works
function generateFileText(path){
    fs.readFile(path, 'utf8', (err, data) => {
        if (err){
            console.log(`Error reading ${path}`);
            process.kill(1)
        }
        let generatedText = new MarkovMachine(data);
        generatedText.makeText();
    })
}

// Makes an axios get request and uses data from the request to create a new instance of a MarkovMachine and generate text
// Doesn't appear to work
function generateURLText(link){
    axios
        .get(link)
        .then((response) => {
            let generateText = new MarkovMachine(response);
            generatedText.makeText();
        })
        .catch(console.log(`Error fetching ${link}`));
}

// Overall function to call for generating text
function generateText(format, path){
    if(determineLegitimateFormat(format)){
        if(determineFile(path) && format == 'file'){
            generateFileText(path)
        }
        else if(determineURL(path) && format == 'url'){
            generateURLText(path)
        }
        else{
            console.log('Please provide either a legitimate path to a file or a legitimate url/link.')
        }
    }
    else{
        console.log('Not a legitimate format. Please use either "file" or "url".')
    }
}

// Function that's executed upon "calling" the file with Node.js
generateText(format, path);