/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.chains = this.makeChains(this.words);
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains(arr) {
    const result = {};
    for (let i = 0; i < arr.length; i++){
      let currentWord = arr[i];
      let nextWord = arr[i + 1];
      if (result[currentWord]){
        if (nextWord && !result[currentWord].includes(nextWord)){
          result[currentWord].push(nextWord)
        }
        else if (nextWord === undefined || nextWord === null) {
          result[currentWord].push(null)
        }
      }
      else {
        result[currentWord] = [];
        if (nextWord){
          result[currentWord].push(nextWord)
        }
        else {
          result[currentWord].push(null)
        }
      }
    }
    console.log(result);
    return result;
  }


  /** return random text from chains */

  makeText(numWords = 30) {
    let chains = this.chains;
    let availableWords = Object.keys(chains);
    const initialArr = [];
    
    // The first word must be picked before starting the loop (it can't be null)
    let firstWord = availableWords[Math.floor(Math.random() * availableWords.length)];
    initialArr.push(firstWord);

    // The loop analyzes the currentWord in the array (always the last value in the array) and evaluates the possible choices. It will then push a random choice into the array.
    for (let i = 0; i < (numWords - 1); i++){
      let currentWord = initialArr[initialArr.length - 1];
      let choices = chains[currentWord];
      let pick = choices[Math.floor(Math.random() * choices.length)];
        
        // If the picked word is not null, the word is pushed to the array
        if (pick){
          initialArr.push(pick)
        }
        
        // If the picked word is null, a period is pushed to the array, along with a new word. This is to ensure actual words are being chosen. 
        else {
          initialArr.push('.');
          let newWord = availableWords[Math.floor(Math.random() * availableWords.length)];
          initialArr.push(newWord);
        }
    }
    
    initialArr.push('.');
    
    // Given an array of strings, the strings will be pushed onto the finalProduct as such: if the current value isn't a period, 
    let firstFinalWord = initialArr[0];
    let finalProduct = [];
    
    // If the first word from the array is more than 1 character in length, only the first letter will be capitalized (the revised word will be placed in the finalProduct)
    if (firstFinalWord.length > 1){
      let firstRevisedWord = firstFinalWord.charAt(0).toUpperCase() + firstFinalWord.slice(1);
      finalProduct.push(firstRevisedWord);
    }
    
    // If the first word from the array is exactly 1 character in length, the word will be capitalized and placed in the finalProduct
    else {
      let firstRevisedWord = firstFinalWord.toUpperCase();
      finalProduct.push(firstRevisedWord)
    }

    // Get rid of the first word to avoid messing with the loop
    initialArr.shift();

    for (let i = 0; i < initialArr.length; i++){
      let currentWord = initialArr[i];
      let index = i;
      
      // If the currentWord is not the first string in the array
      if (index > 0){
        let priorWord = initialArr[i - 1];
        
        // If the currentWord is not a period
        if (currentWord != '.'){
          
          // If the priorWord is not a period
          if (priorWord != '.'){
            finalProduct = finalProduct + ' ' + currentWord;
          }
          
          // If the priorWord is a period
          else {
            
            //If the currentWord is more than 1 character in length, only the first letter will be capitalized, a space will be added to finalProduct along with the revised (capitalized) word
            if (currentWord.length > 1){
              let revisedWord = currentWord.charAt(0).toUpperCase() + currentWord.slice(1);
              finalProduct = finalProduct + ' ' + revisedWord;
            }

            // If the currentWord is exactly 1 character in length, a space will be provided and the capitalized word will be added to the finalProduct
            else {
              let revisedWord = currentWord.toUpperCase();
              finalProduct = finalProduct + ' ' + revisedWord;
            }
            
          }
        }

        // If the currentWord is a period, then the period will be directly added to the finalProduct (no spacing necessary)
        else {
          finalProduct = finalProduct + currentWord;
        }
      }
      
      // If the currentWord is the first string in the array
      else {
        
        // If the currentWord is not a period, then a space will be added to the finalProduct along with the word
        if (currentWord != '.'){
          finalProduct = finalProduct + ' ' + currentWord;
        }

        // If the currentWord is a period, then it will be directly added to the finalProduct
        else {
          finalProduct = finalProduct + currentWord;
        }
      }
    }
  
  // Once the finalProduct is finished, the console will print the string.
  console.log(finalProduct);
  return finalProduct;
  }
}

module.exports = MarkovMachine;