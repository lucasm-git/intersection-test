// GENERAL STATE
///////////////////////////////////////////////////////

let currentDiv;
let currentSound;
let hasBeenSetOn = false;
let musicIsOn = false;





// INTERSECTION OBSERVER
///////////////////////////////////////////////////////

var options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.2
}

function callback( entries, observer ) {

  entries.forEach( entry => {
      var currentDivIndex = entry.target.id - 1;

      if( entry.isIntersecting ) {
        currentDiv = entry.target.id;
        currentSound = sounds[currentDiv - 1];

        console.log( currentDiv );
        console.log( currentSound );

        sounds.forEach( sound => {
          if( !sound.id.includes( currentDiv )) {
            fadeOut( sound );
          }
        });
        
        fadeIn( currentSound );
      }
  })
};

var observer = new IntersectionObserver( callback, options );


var images = document.querySelectorAll( '.objects' );
var sounds = document.querySelectorAll( 'audio' );


images.forEach( image => observer.observe( image ));







// BUTTONS
///////////////////////////////////////////////////////

// const play = document.querySelector('#play');
// const fadeOutButton = document.querySelector('#fade-out');
// const fadeInButton = document.querySelector('#fade-in');
// const reload = document.querySelector('#reload');
const soundOn = document.querySelector('#sound-on');
const soundOff = document.querySelector('#sound-off');

const fadeIn = sound => {
  if( hasBeenSetOn ) {
    sound.play();
  }
  if( sound.volume < 1 && musicIsOn ) {
    for( let i = 0, j = 0; i < 9; i += 1 ) {
      setTimeout(() => { sound.volume += 0.1 }, 80 + j)
      j += 80;
    }
    setTimeout(() => { sound.volume = 1 }, 800);
  }
}

const fadeOut = sound => {
  if( sound.volume > 0 && musicIsOn ) {
    for( let i = 0, j = 0; i < 9; i += 1 ) {
      setTimeout(() => { sound.volume -= 0.1 }, 80 + j)
      j += 80;
    }
    setTimeout(() => { sound.volume = 0}, 800);
  }
}



// play.onclick = () => { sounds[0].play() };
// fadeOutButton.onclick = () => { fadeOut() };
// fadeInButton.onclick = () => { fadeIn() };
// reload.onclick = () => { sounds[0].load() };
soundOn.onclick = () => {
  if( !hasBeenSetOn ) {
    currentSound.load();
    currentSound.play();
    currentSound.volume = 0;
  }
  hasBeenSetOn = true;
  musicIsOn = true;
  fadeIn(currentSound);
};

soundOff.onclick = () => {
  sounds.forEach( sound => fadeOut( sound ));
  musicIsOn = false;
};


































// HOWLER
///////////////////////////////////////////////////////

// var loop1 = document.querySelector( '#S1' );

// // SOUNDS ///////////////////////////////////

// var s1 = new Howl({
//     src: './audio/LOOP 1.1.mp3',
//     loop: true,
//     volume: 0
// })
// var sound1 = s1.play();

// var s2 = new Howl({
//   src: './audio/LOOP 1.3.mp3',
//   loop: true,
//   volume: 0
// })
// var sound2 = s2.play();

// var s3 = new Howl({
//   src: './audio/LOOP 1.6.mp3',
//   loop: true,
//   volume: 0
// })
// var sound3 = s3.play();

// var s4 = new Howl({
//   src: './audio/LOOP 1.7.mp3',
//   loop: true,
//   volume: 0
// })
// var sound4 = s4.play();

// var allSounds =[ s1, s2, s3, s4 ];
// var allSoundPlays =[ sound1, sound2, sound3, sound4 ];

// document.querySelector( '#B1' ).onclick = () => {
//   s1.play();
//   s1.fade(0, 1, 500, sound1);
// };

// document.querySelector( '#stop' ).onclick = () => {
//   s1.fade(1, 0, 500, sound1);
// };