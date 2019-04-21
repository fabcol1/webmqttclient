Vue.component('main-form', {
  props: {
    callback: Function
  },
  data: function() {
    return {
      ip: undefined,
      port: undefined,
      username: undefined,
      password: undefined,
      topic: undefined
    };
  },

  methods: {
    btnClick: function(e) {
      for (const inp in this.$refs) {
        this.applyInputStyle(this.$refs[inp]);
      }
      this.callback(e, this);
    },
    applyInputStyle: function(targetInput) {
      if (targetInput && targetInput.value.length > 0) {
        targetInput.classList.remove('border-danger');
      } else {
        targetInput.classList.add('border-danger');
      }
    }
  },
  mounted() {},

  template: `
  <div
  class="row align-items-end"
  style="max-width: 100%; margin: 0 auto;"
>
    <div class="form-group col-sm-12 col-md-3 ">
    <input
     ref="ip"
      class="form-control "
      type="text"
      v-model="ip"
      placeholder="Ip address"
    />
    </div>
    <div class="form-group col-sm-12 col-md-1 ">
      <input
        ref="port"
        class="form-control "
        type="text"
        v-model="port"
        placeholder="Port"
      />
    </div>
    <div class="form-group col-sm-12 col-md-4 ">
      <input
        class="form-control "
        type="text"
        v-model="username"
        placeholder="Username"
      />
    </div>
    <div class="form-group col-sm-12 col-md-4 ">
      <input
        class="form-control"
        type="text"
        v-model="password"
        placeholder="Password"
      />
    </div>
    <div class="form-group col-sm-12 col-md-10 ">
      <input
        ref="topic"
        class="form-control "
        type="text"
        v-model="topic"
        placeholder="Topic"
      />
    </div>
    <button
      class="form-group btn btn-dark col-sm-12 col-md-2"
      v-on:click="btnClick"
    >
      Connect
    </button>
    </div>
    `
});
