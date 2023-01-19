<template>
    <b-col 
      :sm="colSM"
      :md="colMD"
      :lg="colLG"
      :xl="colXL"
    >
      
        <b-card  
          :img-src="logoUrl"
          v-bind:title="titulo"
        >

        <b-col style="top: 30vh; position: relative;">
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
    colSM: {
      type: String,
      required: false,
      default:"12",
    },
    colMD: {
      type: String,
      required: false,
      default:"12",
    },
    colLG: {
      type: String,
      required: false,
      default:"12",
    },
    colXL: {
      type: String,
      required: false,
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

 /* .fade-enter,
   .fade-leave-to {
      opacity: 0;
   } */

.card-img{
  padding-left: 2vh;
  padding-right: 2vh;
  width: 20px;
  height: 60px;

}


</style>
