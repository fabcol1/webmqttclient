Vue.component('card-mqtt', {
  props: {
    callback: Function,
    k: String,
    ip: String,
    port: String,
    topic: String
  },
  data: function() {
    return {
      key: this.k,
      messages: [],
      client: undefined,
      error: false
    };
  },

  methods: {
    disconnect: function(e) {
      try {
        this.client.disconnect();
      } catch (e) {}
      this.callback(e, this);
    },
    onMessage: function(destination, payload) {
      this.messages.unshift({
        date: new Date().getTime(),
        destination,
        payload
      });
    },
    onDragStartCallback: function(e) {
      if (e.target.id !== 'header') {
        if (e.stopPropagation) e.stopPropagation();
        if (e.cancelBubble != null) e.cancelBubble = true;
        throw 'Stop propagation';
      }
    }
  },

  mounted() {
    try {
      this.client = new MqttEasyClient(
        this.ip,
        this.port,
        this.topic,
        false,
        this.onMessage
      );
    } catch (e) {
      console.log(e);
      this.error = true;
    }
  },

  template: `
    <vue-draggable-resizable class="bg-light" :w="500" :h="250" :min-height="300" :min-width="300" :parent="true" :on-drag-start="onDragStartCallback">
              
    <div class="card text-center" style="position:relative; width:100%; height: 100% ">
        <div class="card-header text-left"  id="header">
          <strong class="text-primary"> {{ip}}</strong>:<strong class="text-success">{{port}}</strong> {{topic}}
        </div>
        <div class="card-body" style="position:relative;">
        <div class= "scroll" style="width:100%; height: 100%; top: 0; position: absolute; left: 0; overflow-y: scroll; text-align: left; padding-left: 7px;">
        
        <div v-if="error" class="text-danger" >Damn! Connection Error!</div>
        <div v-else class="card-text" style="font-size: 10px;" v-for="(value, key) of messages">
          <span class="text-primary">{{value.date}}</span> - <span class="text-success">{{value.destination}}</span> - {{value.payload}}
        </div>

        </div>
         
        </div>
        <div class="card-footer text-muted">
        <div class="row">
          <button class="ml-auto bottom btn btn-primary" v-on:click="disconnect">Disconnetti</button>
        </div>
        </div>
      </div>
    
 </vue-draggable-resizable>
    `
});
