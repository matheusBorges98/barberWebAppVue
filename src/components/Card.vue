<template>
  <Transition
      :name="transitionName"
  >
    <b-col
        :sm="colSM"
        :md="colMD"
        :lg="colLG"
        :xl="colXL"
        v-if="showMyDiv"
    >

      <b-card
          v-bind:title="titulo"
          :style="$route.name === 'Login' ? 'height: 100vh' : 'height:calc(100vh - 100px);'"
      >

        <b-col
            :class="containerSlotClass"
            :style="containerSlotStyle"
        >
          <slot></slot>
        </b-col>

      </b-card>

    </b-col>
  </Transition>
</template>

<script>
export default {
  name: 'Card',
  data() {
    return {
      showMyDiv: false,
      cardHeight: "",
    }
  },
  props: {
    titulo: {
      type: String,
      // required: true,
    },
    colSM: {
      type: String,
      required: false,
      default: "12",
    },
    colMD: {
      type: String,
      required: false,
      default: "12",
    },
    colLG: {
      type: String,
      required: false,
      default: "12",
    },
    colXL: {
      type: String,
      required: false,
      default: "12",
    },
    alignRight: {
      type: Boolean,
      default: false
    },
    logoUrl: {
      type: String,
      default: "",
    },
    containerSlotStyle: {
      type: String,
      default: "",
    },
    containerSlotClass: {
      type: String,
      default: "",
    },
    transitionName: {
      type: String,
      required: false,
      default: "fade"
    },
  },

  mounted() {
    this.showMyDiv = true;
  },
}
</script>

<style>
.card-body {
  background-color: #f2f2f2
}

.card-img {
  padding-left: 2vh;
  padding-right: 2vh;
  width: 20px;
  height: 60px;

}

.card {
  border-radius: 0 !important;
}


.fade-enter-active, .fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.slide-right-enter-active, .slide-right-leave-active {
  transition: all 0.5s ease;
}

.slide-right-enter {
  transform: translateX(100%);
}

.slide-right-leave-to {
  transform: translateX(-100%);
}
</style>
