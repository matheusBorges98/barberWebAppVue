<template>
    <FloatingLabel
      :config="{label: label}"
      >
       <b-form-input
          class="customInput"
          size="md"
          :v-model="vmodel"
          v-on:change="onChange"
          :state="null"
        ></b-form-input>
  </FloatingLabel>
</template>

<script>
import FloatingLabel from 'vue-simple-floating-labels'

export default {
  name: 'CustomInput',
  components: {
    FloatingLabel
  },
  data(){
    return{
      vmodel : this.value
    } 
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    // value: {
    //   type: String,
    //   required: true,
    // },
    value: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
    },
    valid: {
      type: String,
      default: null,
    },
  },
  computed: {
    name() {
      return this.label.toLowerCase()
    },
  },
  methods: {
    onChange(value) {
      // Supports .lazy
      console.log(value)
      //this.value = event
      //return event

      this.$emit('changeValue', { [this.name]: value })
    },
  },
}
</script>
<style>
.customInput {
  margin-top:15px;
  padding:0

}

.customInput:focus {
   outline: none !important;

}

textarea:focus,
input[type="text"]:focus,
input[type="password"]:focus,
input[type="datetime"]:focus,
input[type="datetime-local"]:focus,
input[type="date"]:focus,
input[type="month"]:focus,
input[type="time"]:focus,
input[type="week"]:focus,
input[type="number"]:focus,
input[type="email"]:focus,
input[type="url"]:focus,
input[type="search"]:focus,
input[type="tel"]:focus,
input[type="color"]:focus,
.uneditable-input:focus {   
  box-shadow: 0 0 0;
  outline: 0 none;
}

</style>
