const speech = new SpeechSynthesisUtterance();

let voices = [];

const textarea = document.querySelector('textarea');
const  speakButton = document.querySelector('button');
const voiceSelect = document.querySelector('select');

window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();
  speech.voice = voices[0];

  //adding different voices
  voices.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)));
};

voiceSelect.addEventListener('change', () => {
  speech.voice = voices[voiceSelect.value];
});

speakButton.addEventListener('click', () => {
  speech.text = textarea.value;

   // Disable button while speaking
  speakButton.disabled = true;

  // When speech ends, re-enable button
  speech.onend = () => {
    speakButton.disabled = false;
  };
  window.speechSynthesis.speak(speech);
});