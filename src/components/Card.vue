<template>
    <b-col :cols="cols">
      <b-card  
        :img-src="logoUrl"
        v-bind:title="titulo"
      >

      <b-col style="margin-top:30vh">
        <slot> </slot>
      </b-col>

      </b-card> 
    </b-col>

</template>

<script>
export default {
  name: 'Card',
  props: {
    // body: {
    //   type: String,
    //   required: true,
    // },
    titulo: {
      type: String,
      // required: true,
    },
    cols: {
      type: String,
      required: true,
      default:"12",
    },
    alignRight:{
       type: Boolean,
       default:false
    },
    logoUrl:{
      type: String,
      default:"",
    }
    // style: {
    //   type: String,
    //   required: true,
    // },
  },
}
</script>

<style>
.card-body{
  height: 100vh;
}

/* .card-img{
  padding-left: 2vh;
  padding-right: 2vh;

} */


</style>
