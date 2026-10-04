function summarizeText() {

```
let text = document.getElementById("inputText").value.trim();
let result = document.getElementById("summaryText");

if (text === "") {
    result.innerHTML = "⚠️ Please enter some text.";
    return;
}

// Split text into sentences
let sentences = text.match(/[^.!?]+[.!?]+/g);

if (!sentences) {
    result.innerHTML = "⚠️ Please enter a complete paragraph.";
    return;
}

// If the text is already short
if (sentences.length <= 2) {
    result.innerHTML =
        "📌 " + sentences.join(" ");
    return;
}

// Common words that should not affect sentence importance
let stopWords = [
    "the", "is", "a", "an", "and", "or", "but",
    "in", "on", "at", "to", "of", "for", "with",
    "this", "that", "it", "as", "are", "was",
    "were", "be", "by", "from", "has", "have",
    "had", "will", "can", "about", "their", "they",
    "them", "he", "she", "his", "her", "we", "you"
];

// Create word frequency list
let words = text
    .toLowerCase()
    .replace(/[^a-zA-Z\s]/g, "")
    .split(/\s+/);

let frequency = {};

words.forEach(function(word) {

    if (word.length > 2 && !stopWords.includes(word)) {

        if (frequency[word]) {
            frequency[word]++;
        } else {
            frequency[word] = 1;
        }
    }
});

// Calculate score for each sentence
let sentenceScores = [];

sentences.forEach(function(sentence, index) {

    let sentenceWords = sentence
        .toLowerCase()
        .replace(/[^a-zA-Z\s]/g, "")
        .split(/\s+/);

    let score = 0;

    sentenceWords.forEach(function(word) {

        if (frequency[word]) {
            score += frequency[word];
        }

    });

    sentenceScores.push({
        sentence: sentence.trim(),
        score: score,
        index: index
    });

});

// Sort sentences according to score
sentenceScores.sort(function(a, b) {
    return b.score - a.score;
});

// Select top sentences
let numberOfSentences = Math.ceil(sentences.length / 3);

let selectedSentences =
    sentenceScores.slice(0, numberOfSentences);

// Keep original order
selectedSentences.sort(function(a, b) {
    return a.index - b.index;
});

let summary = selectedSentences
    .map(function(item) {
        return item.sentence;
    })
    .join(" ");

result.innerHTML = "📌 " + summary;
```

}

// Clear input and summary
function clearText() {

```
document.getElementById("inputText").value = "";

document.getElementById("summaryText").innerHTML =
    "Your summary will appear here.";
```

}

// Load sample text
function loadExample() {

```
let sampleText =
    "Cloud computing is a technology that allows users to access computing resources over the internet. " +
    "These resources include servers, storage, databases, networking, and software. " +
    "Cloud computing helps organizations reduce hardware costs and improve flexibility. " +
    "Users can access cloud services from different locations using an internet connection. " +
    "Many companies use cloud computing to store data and run applications. " +
    "Cloud platforms also provide scalability, allowing organizations to increase or decrease resources when required. " +
    "Because of these advantages, cloud computing has become an important technology for modern businesses.";

document.getElementById("inputText").value = sampleText;

summarizeText();
```

}
