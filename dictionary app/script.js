 // Get the form elements
 const form = document.getElementById("form");
 const input = document.getElementById("input");
 const button = document.getElementById("button");
 const output = document.getElementById("output");

 // Add an event listener to the form
 form.addEventListener("submit", (event) => {
   // Prevent the default form behavior
   event.preventDefault();
   // Get the input value
   const word = input.value.trim();
   // Check if the input is not empty
   if (word) {
     // Disable the button and show a loading message
     button.disabled = true;
     output.innerHTML = "Loading...";
     // Fetch the dictionary data from an API
     fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
       .then((response) => response.json())
       .then((data) => {
         // Check if the data is an array
         if (Array.isArray(data)) {
           // Get the first element of the array
           const entry = data[0];
           // Get the word, phonetic, and meaning from the entry
           const word = entry.word;
           const phonetic = entry.phonetic;
           const meaning = entry.meanings[0];
           // Get the part of speech, definition, synonyms, antonyms, and example from the meaning
           const partOfSpeech = meaning.partOfSpeech;
           const definition = meaning.definitions[0].definition;
           const synonyms = meaning.definitions[0].synonyms;
           const antonyms = meaning.definitions[0].antonyms;
           const example = meaning.definitions[0].example;
           // Create a HTML string to display the dictionary data
           let html = `<p><strong>Word:</strong> ${word}</p>`;
           html += `<p><strong>Phonetic:</strong> /${phonetic}/</p>`;
           html += `<p><strong>Part of speech:</strong> ${partOfSpeech}</p>`;
           html += `<p><strong>Definition:</strong> ${definition}</p>`;
           if (synonyms) {
             html += `<p><strong>Synonyms:</strong> ${synonyms.join(", ")}</p>`;
           }
           if (antonyms) {
             html += `<p><strong>Antonyms:</strong> ${antonyms.join(", ")}</p>`;
           }
           if (example) {
             html += `<p><strong>Example:</strong> ${example}</p>`;
           }
           // Update the output element with the HTML string
           output.innerHTML = html;
         } else {
           // If the data is not an array, show an error message
           output.innerHTML = "Sorry, no results found.";
         }
       })
       .catch((error) => {
         // If there is an error, show an error message
         output.innerHTML = "Sorry, something went wrong.";
       })
       .finally(() => {
         // Enable the button
         button.disabled = false;
       });
   } else {
     // If the input is empty, show an error message
     output.innerHTML = "Please enter a word.";
   }
 });