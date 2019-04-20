Vue.component('card-mqtt', {
  props: {
    disconnectCallback: Function,
    zIndexCallback: Function,
    k: String,
    ip: String,
    port: String,
    topic: String,
    username: String,
    password: String
  },
  data: function() {
    return {
      key: this.k,
      messages: [],
      client: undefined,
      error: false,
      zindex: 1000
    };
  },

  methods: {
    disconnect: function(e) {
      try {
        this.client.disconnect();
      } catch (e) {}
      this.disconnectCallback(e, this);
    },
    onMessage: function(destination, payload) {
      setTimeout(() => {
        this.messages.unshift({
          date: new Date().getTime(),
          destination,
          payload
        });
      }, 7);
    },
    onDragStartCallback: function(e) {
      this.zIndexCallback(e, this);

      // if (e.target.id !== 'header') {
      //   if (e.stopPropagation) e.stopPropagation();
      //   if (e.cancelBubble != null) e.cancelBubble = true;
      //   throw 'Stop propagation';
      // }
    }
  },

  mounted() {
    try {
      this.client = new MqttEasyClient(
        this.ip,
        this.port,
        this.topic,
        this.username,
        this.password,
        false,
        this.onMessage
      );
    } catch (e) {
      console.log(e);
      this.error = true;
    }
  },

  template: `
    <vue-draggable-resizable class="bg-light" :w="500" :h="250" :min-height="300" :min-width="300" :parent="true" :on-drag-start="onDragStartCallback" :z="zindex" :handles="['br', 'bl']">
      <div class="card text-center" style="position:relative; width:100%; height: 100% ">
        <div class="card-header text-left bg-light" id="header">
          <code class="text-dark"> {{ip}}</code>:<code class="text-success">{{port}}</code> <code class="text-dark">{{topic}}</code>
        </div>
        <div class="card-body" style="position:relative;">
          <div class= "scroll" style="width:100%; height: 100%; top: 0; position: absolute; left: 0; overflow-y: scroll; text-align: left; padding-left: 7px;">
            <div v-if="error" class="text-danger" >Damn! Connection Error!</div>
            <div v-else class="card-text" style="font-size: 12px;" v-for="(value, key) of messages">
              <code class="text-dark">{{value.date}}</code> - <code class="text-success">{{value.destination}}</code> - <code class="text-dark">{{value.payload}}</code>
            </div>
          </div>
        </div>
        <div class="card-footer text-muted bg-light">
          <div class="row">
            <button class="ml-auto btn btn-dark" v-on:click="disconnect">Disconnect</button>
          </div>
        </div>
      </div>
    </vue-draggable-resizable>
    `
});
