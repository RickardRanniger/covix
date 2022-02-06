export default class SoundManager {
  audioContext = new AudioContext();
  buffers: { [key: string]: AudioBuffer } = {};
  sounds: { [key: string]: string } = {
    music: "assets/music.mp3",
    rotate: "assets/blip.wav",
    clearRows: "assets/clear.wav",
    drop: "assets/drop.wav",
    gameOver: "assets/gameOver.wav",
    levelUp: "assets/levelUp.wav",
    fourLines: "assets/fourLines.wav",
  };

  musicTrackSource: AudioBufferSourceNode;

  load = async (filename: string) => {
    const response = await fetch(filename);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
    return audioBuffer;
  };

  pause = async () => {
    this.audioContext.suspend();
  };

  resume = async () => {
    this.audioContext.resume();
  };

  stop = async () => {
    this.musicTrackSource.stop();
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

  playMusic = (sound: string): void => {
    this.musicTrackSource = this.audioContext.createBufferSource();
    this.musicTrackSource.buffer = this.buffers[sound];
    this.musicTrackSource.connect(this.audioContext.destination);
    this.musicTrackSource.loop = true;
    this.musicTrackSource.start();
  };
}
