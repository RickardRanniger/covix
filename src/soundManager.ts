export default class SoundManager {
  audioContext = new AudioContext();
  buffers: { [key: string]: AudioBuffer } = {};
  sounds: { [key: string]: string } = {
    music: "assets/music.mp3",
    rotate: "assets/blip.wav",
    clearRows: "assets/clear.wav",
    drop: "assets/drop.wav",
    gameOver: "assets/gameOver.wav",
  };

  load = async (filename: string) => {
    const response = await fetch(filename);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
    return audioBuffer;
  };

  init = async () => {
    for (const sound in this.sounds) {
      this.buffers[sound] = await this.load(this.sounds[sound]);
    }
  };

  play = (sound: string, loop = false): void => {
    const trackSource = this.audioContext.createBufferSource();
    trackSource.buffer = this.buffers[sound];
    trackSource.connect(this.audioContext.destination);
    trackSource.loop = loop;
    trackSource.start();
  };
}
