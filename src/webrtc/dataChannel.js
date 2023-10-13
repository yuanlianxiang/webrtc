/* eslint-disable no-unused-vars */
/** @format */

const STATE = {
  Open: 1,
  Close: 2,
};

export default class DataChannel {
  constructor(peerConnection, name, channel) {
    this.peerConnection = peerConnection;
    this.name = name;
    this.channel = channel;
    this.state = STATE;

    this.onopen = (event) => {};
    this.onclose = (event) => {};
    this.onmessage = (event) => {};
  }

  init() {
    if (!this.channel) {
      this.channel = this.peerConnection.connection.createDataChannel(
        this.name,
        {
          ordered: true,
          maxRetransmits: 30,
        }
      );
    }

    this.channel.onopen = (event) => {
      this.state.Open = STATE.Open;
      typeof this.onopen === "function" && this.onopen(event);
    };

    this.channel.onclose = (event) => {
      this.state.Close = STATE.Close;
      typeof this.onclose === "function" && this.onclose(event);
    };

    this.channel.onmessage = (event) => {
      typeof this.onmessage === "function" && this.onmessage(event, event.data);
    };
  }

  sendMessage(message) {
    let data = null;
    if (typeof message === "string") data = message;
    if (typeof message === "object") data = JSON.stringify(message);

    if (data && this.channel && this.channel.readyState === "open") {
      this.channel.send(data);
    }
  }

  sendBlob(data) {
    if (data && this.channel && this.channel.readyState === "open") {
      try {
        this.channel.send(data);
      } catch (error) {
        console.log(error);
      }
    }
  }

  dispose() {
    this.channel.close();
    this.peerConnection = null;
    this.state = STATE.Close;
    this.name = null;
    this.onopen = null;
    this.onclose = null;
    this.onmessage = null;
  }
}
