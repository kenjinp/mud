import bubble from "../../assets/sounds/bubble.wav";
import cancel from "../../assets/sounds/cancel.wav";
import confirm from "../../assets/sounds/confirm.wav";
import select from "../../assets/sounds/select.wav";
import text from "../../assets/sounds/text.wav";

const soundLibrary = {
  bubble,
  cancel,
  confirm,
  select,
  text
};

const DEFAULT_VOLUME = 0.2;

// TODO preload sounds and have load callback.

export const playSound = (name: string) => {
  const sound = soundLibrary[name];
  if (!sound) {
    return console.warn(`No sound called ${name} found.`);
  }

  const audio = new Audio(sound);
  audio.volume = DEFAULT_VOLUME;
  // https://stackoverflow.com/questions/40276718/how-to-handle-uncaught-in-promise-domexception-the-play-request-was-interru
  const playPromise = audio.play();
  if (playPromise !== null) {
    playPromise.catch(() => {
      audio.play();
    });
  }
};
