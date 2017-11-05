var Scale = (function() {
    'use strict';
    var default_scale = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
    var currentNote = 0;
    var playButton;
    var octave = 4;
    var audioContext;
    var oscillator;
    var gain;
    var bpm;
    var timeSignature = [4, 4];

    var Scale = function() {
        audioContext = new AudioContext();
        playButton = document.getElementById("play");

        Scale.setupEventListeners();
    };

    Scale.setupEventListeners = function() {
        playButton.addEventListener('mousedown', function(e){
            e.preventDefault();
           // Scale.playSound(Scale.calculateFrequency('c'));
           Scale.playScale();
        });
    }

    Scale.playNote = function(i) {
        oscillator = audioContext.createOscillator();
        gain = audioContext.createGain();

        gain.connect(audioContext.destination);
        oscillator.connect(gain);

        oscillator.type = 'triangle';
        gain.gain.value = 0.5;
        oscillator.frequency.value = Scale.calculateFrequency(default_scale[i]);
        oscillator.start(0);

        // queue the next note
        oscillator.onended = (e) => {
            if (default_scale[i+1]) {
                Scale.playNote(i+1);
            }
        };

        // stop
        Scale.stopSound(Scale.calculateNoteDuration());
    }

    Scale.stopSound = function(t) {
        oscillator.stop(audioContext.currentTime + t);
    };

    Scale.calculateNoteDuration = function() {
        return 0.25; //eh, I'll do this later
    }

    Scale.playScale = function() {
        // play first note
        Scale.playNote(0);
        //stop
        //Scale.stopSound(Scale.calculateNoteDuration());
    }

    Scale.calculateFrequency = function(n) {
        switch(n) {
            case 'c':
                return 261.63;
            case 'd':
                return 293.66;
            case 'e':
                return 329.63;
            case 'f':
                return 349.23;
            case 'g':
                return 392;
            case 'a':
                return 440;
            case 'b':
                return 493.88;
            default:
                return 440;
        }
    }

    return Scale;
})();

window.onload = function(){
    var cScale = new Scale();
    console.log(cScale);
}