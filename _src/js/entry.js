const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const btn = document.getElementById('btn-start');
const output = document.getElementById('output');

let isRec = false;

const synthes = new SpeechSynthesisUtterance();
//synthes.text = 'そうですね';
synthes.text = 'こんにちは';
synthes.lang = 'ja-JP';
synthes.addEventListener('end', (evt) => {
    console.log(evt.utterance.text);
    log('me: ' + evt.utterance.text);

    recognition.start();
});
//speechSynthesis.speak(synthes);


const recognition = new SpeechRecognition();
recognition.lang = 'ja';
recognition.continuous = true;
recognition.interimResults = false;

recognition.addEventListener('start', () => {
    console.log('start');
    recognition.continuous = true;
    isRec = true;
    btn.innerText = 'STOP';
});
recognition.addEventListener('end', () => {
    console.log('end');
    isRec = false;
    btn.innerText = 'START';
});
recognition.addEventListener('nomatch', (evt) => {
    console.log('nomatch');
});
recognition.addEventListener('soundstart', (evt) => {
    console.log('soundstart');
});
recognition.addEventListener('soundend', (evt) => {
    console.log('soundend');
});
recognition.addEventListener('speechstart', (evt) => {
    console.log('speechstart');
    recognition.continuous = false;
});
recognition.addEventListener('speechend', (evt) => {
    console.log('speechend');
});
recognition.addEventListener('audiostart', (evt) => {
    console.log('audiostart');
});
recognition.addEventListener('audioend', (evt) => {
    console.log('audioend');
});
recognition.addEventListener('result', (evt) => {
    console.log('result');
    recognition.stop();
    const transcriptList = getTranscriptList(evt.results);
    const transcripts = transcriptList.join('、');

    console.log(transcriptList);
    log('you: ' + transcripts);

    synthes.text = transcripts + '、と言いましたね';
    speechSynthesis.speak(synthes);
});

btn.addEventListener('click', () => {
    if (isRec) {
        recognition.stop();
    }
    else {
        synthes.text = 'こんにちは';
        speechSynthesis.speak(synthes);
        //recognition.start();
    }
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
