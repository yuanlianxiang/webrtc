/** @format */

export default class UserMedia {
  constructor(constrainst) {
    this.constrainst = constrainst;
    this.stream = null;
    this.videoTracks = [];
    this.audioTracks = [];
  }

  async init() {
    const stream = await navigator.mediaDevices.getUserMedia(this.constrainst);
    this.stream = stream;
    this.videoTracks = stream.getVideoTracks();
    this.audioTracks = stream.getAudioTracks();
    return stream;
  }

  stopVideo(index = 0) {
    this.videoTracks && this.videoTracks[index] && this.videoTracks[index].stop();
  }

  stopAudio(index = 0) {
    this.audioTracks && this.audioTracks[index] && this.audioTracks[index].stop();
  }

  dispose() {
    this.stream && this.stream.getTracks().forEach((track) => track.stop());
  }
}
