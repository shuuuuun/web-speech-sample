const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const btn = document.getElementById('btn-start');
const output = document.getElementById('output');

const synthes = new SpeechSynthesisUtterance();
//synthes.text = 'そうですね';
synthes.text = 'こんにちは';
synthes.lang = 'ja-JP';
synthes.addEventListener('end', (evt) => {
    console.log(evt.utterance.text);
    log('me: ' + evt.utterance.text);
});
speechSynthesis.speak(synthes);


const recognition = new SpeechRecognition();
recognition.lang = 'ja';

recognition.addEventListener('result', (evt) => {
    const transcriptList = getTranscriptList(evt.results);
    const transcripts = transcriptList.join('、');

    console.log(transcriptList);
    log('you: ' + transcripts);

    synthes.text = transcripts + '、と言いましたね';
    speechSynthesis.speak(synthes);
});

btn.addEventListener('click', () => {
    recognition.start();
}, false);


function getTranscriptList(results) {
    const transcriptList = [];
    for (let i = 0, len = results.length; i < len; i++) {
        const result = results.item(i);
        for (let j = 0, len = results.length; j < len; j++) {
            const alternative = result.item(j);
            transcriptList.push(alternative.transcript);
        }
    }
    return transcriptList;
}


function log(text) {
  const p = document.createElement('p');
  //p.innerText = getTime() + ': ' + text;
  p.innerText = text;
  output.appendChild(p);
}

function getTime() {
  const d = new Date();
  const h = zeroPadding(d.getHours(), 2);
  const m = zeroPadding(d.getMinutes(), 2);
  const s = zeroPadding(d.getSeconds(), 2);
  const ms = zeroPadding(d.getMilliseconds(), 3);
  return h + ':' + m + ':' + s;
}

function zeroPadding(num, len) {
  return (new Array(len).join('0') + num).slice(-len);
}
