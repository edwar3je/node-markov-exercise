const MarkovMachine = require('./markov.js');

describe('makeChains tests', function(){
    let string;
    beforeEach(function (){
        string = 'the cat in the hat';
    })
    afterEach(function (){
        string = '';
    })
    
    test('if a word is followed by another word in a string, that word should show up as a value', function(){
        const catHat = new MarkovMachine(string);
        const results = catHat.makeChains(catHat.words);
        expect(results['cat']).toEqual(['in']);
    });

    test('if a word is followed by nothing in a string, null should show up as a value', function(){
        const catHat = new MarkovMachine(string);
        const results = catHat.makeChains(catHat.words);
        expect(results['hat']).toEqual([null]);
    });

    test('if the same word is included twice in a string, then two values should show up for that word', function(){
        const catHat = new MarkovMachine(string);
        const results = catHat.makeChains(catHat.words);
        expect(results['the']).toEqual(['cat', 'hat']);
    })
})

describe('makeText tests', function(){
    let string;
    let catHat;
    beforeEach(function (){
        string = 'the cat in the hat';
        catHat = new MarkovMachine(string);
    })
    afterEach(function (){
        string = '';
        catHat = '';
    })

    test('makeText should only generate a string', function(){
        const text = catHat.makeText();
        expect(text).toEqual(expect.any(String));
    });

    test('makeText should generate a string containing 30 words by default', function(){
        const text = catHat.makeText();
        let words = text.split(/[ \r\n]+/);
        let final = words.filter(c => c !== "");
        expect(final.length).toEqual(30);
    })

    test('makeText should generate a string containing "x-number" of words specified by the argument in the function', function(){
        const text = catHat.makeText(50);
        let words = text.split(/[ \r\n]+/);
        let final = words.filter(c => c !== "");
        expect(final.length).toEqual(50);
    })
})