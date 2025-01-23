document.addEventListener('DOMContentLoaded', function() {
    const hiraganaCharacters = [
        { character: 'あ', romanji: 'a' },
        { character: 'い', romanji: 'i' },
        { character: 'う', romanji: 'u' },
        { character: 'え', romanji: 'e' },
        { character: 'お', romanji: 'o' },
        { character: 'か', romanji: 'ka' },
        { character: 'き', romanji: 'ki' },
        { character: 'く', romanji: 'ku' },
        { character: 'け', romanji: 'ke' },
        { character: 'こ', romanji: 'ko' },
        { character: 'さ', romanji: 'sa' },
        { character: 'し', romanji: 'shi' },
        { character: 'す', romanji: 'su' },
        { character: 'せ', romanji: 'se' },
        { character: 'そ', romanji: 'so' },
        { character: 'た', romanji: 'ta' },
        { character: 'ち', romanji: 'chi' },
        { character: 'つ', romanji: 'tsu' },
        { character: 'て', romanji: 'te' },
        { character: 'と', romanji: 'to' },
        { character: 'な', romanji: 'na' },
        { character: 'に', romanji: 'ni' },
        { character: 'ぬ', romanji: 'nu' },
        { character: 'ね', romanji: 'ne' },
        { character: 'の', romanji: 'no' },
        { character: 'は', romanji: 'ha' },
        { character: 'ひ', romanji: 'hi' },
        { character: 'ふ', romanji: 'fu' },
        { character: 'へ', romanji: 'he' },
        { character: 'ほ', romanji: 'ho' },
        { character: 'ま', romanji: 'ma' },
        { character: 'み', romanji: 'mi' },
        { character: 'む', romanji: 'mu' },
        { character: 'め', romanji: 'me' },
        { character: 'も', romanji: 'mo' },
        { character: 'や', romanji: 'ya' },
        { character: 'ゆ', romanji: 'yu' },
        { character: 'よ', romanji: 'yo' },
        { character: 'ら', romanji: 'ra' },
        { character: 'り', romanji: 'ri' },
        { character: 'る', romanji: 'ru' },
        { character: 'れ', romanji: 're' },
        { character: 'ろ', romanji: 'ro' },
        { character: 'わ', romanji: 'wa' },
        { character: 'を', romanji: 'wo' },
        { character: 'ん', romanji: 'n' },
    ];

    const hiraganaElement = document.getElementById('hiragana-character');
    const revealOptionsBtn = document.getElementById('reveal-options');
    const optionsContainer = document.getElementById('options');
    const feedbackElement = document.getElementById('feedback');
    const nextCharacterBtn = document.getElementById('next-character');
    const scoreElement = document.getElementById('score');

    let correctAnswers = 0;
    let wrongAnswers = 0;

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    // Function to display the initial hiragana character on load
    function displayRandomCharacter() {
        const randomIndex = getRandomInt(hiraganaCharacters.length);
        const characterObj = hiraganaCharacters[randomIndex];
        hiraganaElement.textContent = characterObj.character;
        revealOptionsBtn.dataset.correctAnswer = characterObj.romanji;

        // Clear and hide the options
        optionsContainer.innerHTML = '';
        optionsContainer.style.display = 'none';

        feedbackElement.style.display = 'none';
        nextCharacterBtn.style.display = 'none';

        console.log("Displayed character:", characterObj.character);
    }

    // Reveal options with correct and random incorrect answers
    function revealOptions() {
        console.log("Reveal Options clicked");

        // Clear previous options
        optionsContainer.innerHTML = '';
        feedbackElement.style.display = 'none';
        nextCharacterBtn.style.display = 'none';

        const correctAnswer = revealOptionsBtn.dataset.correctAnswer;
        const options = [correctAnswer];

        // Add random wrong answers
        while (options.length < 4) {
            const randomOption = hiraganaCharacters[getRandomInt(hiraganaCharacters.length)].romanji;
            if (!options.includes(randomOption)) {
                options.push(randomOption);
            }
        }

        console.log("Generated options before shuffle:", options);

        // Shuffle the options
        options.sort(() => Math.random() - 0.5);
        console.log("Shuffled options:", options);

        // Create buttons for the options
        options.forEach(option => {
            console.log("Creating button for option:", option);
            const optionBtn = document.createElement('button');
            optionBtn.classList.add('option-btn');
            optionBtn.textContent = option;

            // Attach event listener for selecting an option
            optionBtn.addEventListener('click', () => {
                console.log("Option selected:", option);
                checkAnswer(option);
            });

            optionsContainer.appendChild(optionBtn);
            console.log("Button created for option:", option);
        });

        // Show options container
        optionsContainer.style.display = 'block';
    }

    // Check if selected answer is correct
    function checkAnswer(selectedOption) {
        console.log("Checking answer:", selectedOption);

        const correctAnswer = revealOptionsBtn.dataset.correctAnswer;
        feedbackElement.style.display = 'block';

        if (selectedOption === correctAnswer) {
            correctAnswers++;
            feedbackElement.textContent = 'Correct!';
            feedbackElement.classList.add('correct');
            feedbackElement.classList.remove('wrong');
        } else {
            wrongAnswers++;
            feedbackElement.textContent = 'Wrong!';
            feedbackElement.classList.add('wrong');
            feedbackElement.classList.remove('correct');
        }

        // Update score
        scoreElement.textContent = `Correct: ${correctAnswers} | Wrong: ${wrongAnswers}`;

        nextCharacterBtn.style.display = 'block';
    }

    // Add event listener to the "Reveal Options" button
    if (revealOptionsBtn) {
        revealOptionsBtn.addEventListener('click', revealOptions);
        console.log("Reveal Options button event listener attached");
    } else {
        console.error("Reveal Options button not found!");
    }

    // Add event listener for "Next Character"
    nextCharacterBtn.addEventListener('click', displayRandomCharacter);

    // Initial character display
    displayRandomCharacter();
});
