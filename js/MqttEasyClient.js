class MqttEasyClient {
  constructor(ip, port, topic, username, password, logs, onMessageArrived) {
    this.ip = ip;
    this.port = port;
    this.topic = topic;
    this.username = username;
    this.password = password;
    this.onMessageArrived = onMessageArrived;
    this.clientId = this._guid();
    this.client = this._connect();
    this.logs = logs;
  }

  disconnect() {
    if (this.client) {
      this.client.disconnect();
      if (this.logs) {
        console.log(
          `%cclient %c${this.clientId} %cdisconnected`,
          'color:black',
          'color: red',
          'color: black'
        );
      }
    }
  }

  _connect() {
    if (Paho.MQTT.Client) {
      let c = undefined;
      try {
        c = new Paho.MQTT.Client(this.ip, Number(this.port), this.clientId);
        c.onConnectionLost = this._onConnectionLost.bind(this);
        c.onMessageArrived = this._onMessageArrived.bind(this);
        let connectOptions = {
          onSuccess: this._onSuccess.bind(this),
          useSSL: true
        };
        if (this.username && this.password) {
          connectOptions = {
            ...connectOptions,
            userName: this.username,
            password: this.password
          };
        }
        if (this.logs) {
          console.log(connectOptions);
        }
        c.connect(connectOptions);
      } catch (e) {
        throw e;
      }
      return c;
    }
  }

  _onSuccess() {
    if (this.client && this.topic) {
      this.client.subscribe(this.topic);
    }
  }

  _onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      if (this.logs) {
        console.log('onConnectionLost: ' + responseObject.errorMessage);
      }
    }
  }

  _onMessageArrived(message) {
    try {
      if (this.logs) {
        console.log('Topic:', message.destinationName);
        console.log('Payload:', message.payloadString);
      }
      if (this.onMessageArrived) {
        this.onMessageArrived(message.destinationName, message.payloadString);
      }
    } catch (e) {
      if (this.logs) {
        console.log(e);
      }
    }
  }

  _guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
  }
}
