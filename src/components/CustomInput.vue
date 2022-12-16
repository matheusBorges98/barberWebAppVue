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
</style>
