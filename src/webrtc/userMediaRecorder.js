export default class UserMediaRecorder {
  constructor(stream, mimeType = "video/webm;codecs=h264") {
    this.stream = stream;
    this.mimeType = mimeType;
    this.recorder = null;
  }

  init() {
    this.recorder = new MediaRecorder(this.stream, { mimeType: this.mimeType });
    return this.recorder;
  }

  start() {
    this.recorder.start();
  }

  stop() {
    return new Promise((resolve) => {
      this.recorder.ondataavailable = (event) => {
        resolve(event.data);
        this.recorder.ondataavailable = null;
      };
      this.recorder.stop();
    });
  }

  dispose() {
    this.stream = null;
    this.recorder = null;
    this.mimeType = null;
  }
}
