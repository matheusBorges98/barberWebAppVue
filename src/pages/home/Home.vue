<template>
  <b-row>
    <!-- <Navbar/> -->
    <Card
        colSM="12"
        colMD="12"
        colLG="12"
        colXL="12"
        containerSlotStyle="top: 0; position: relative;"
        containerSlotClass="text-center"
    >
      <p>home</p>
    </Card>
  </b-row>
</template>

<script>
/* eslint-disable */

export default {
  components: {},
  data: function () {
    return {
      json:[]
    }
  },
}
</script>
<style>

div.jsoneditor-outer.has-main-menu-bar {
  background-color: grey;
}

.jsoneditor-contextmenu .jsoneditor-menu li button.jsoneditor-selected{
  background-color:grey !important;
}

.jsoneditor-contextmenu .jsoneditor-menu li button.jsoneditor-selected :focus{
  background-color: grey;
}

.jsoneditor-container.min-box {
  min-width: auto !important;
}

div.jsoneditor-menu a.jsoneditor-poweredBy {
  display: none !important;
}

.jsoneditor-frame{
  border-radius:10px
}

.jsoneditor-treepath{
  color: #fff;
}

.container{
  /* width: 75vw;
  height:90vh;
  background: linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(237, 237, 237) 19%, rgb(232, 232, 232) 78%);
  border-bottom-left-radius: 185px;
  border-bottom-right-radius: 100px;
  border-top-right-radius: 185px; */
}

.text{
  font-weight: 900;
  font-size:25px;
  color:rgb(48, 48, 48)
}

</style>