<template>
  <vue-navigation-bar
      :options="navbarOptions"
      @vnb-item-clicked="changeRoute"
  />

</template>

<script>
import BootstrapSidebar from "vue-bootstrap-sidebar";
import brandImage from "../assets/mb-solucoes.png"

export default {
  components: {
    BootstrapSidebar,
  },
  name: 'Navbar',

  data: function () {
    return {
      navbarOptions: {
        elementId: "main-navbar",
        isUsingVueRouter: true,
        mobileBreakpoint: 992,
        brandImagePath: "Home",
        brandImage,
        brandImageAltText: "brand-image",
        collapseButtonOpenColor: "#661c23",
        collapseButtonCloseColor: "#661c23",
        showBrandImageInMobilePopup: true,
        ariaLabelMainNav: "MB Soluções",
        tooltipAnimationType: "perspective",
        tooltipPlacement: "bottom",
        menuOptionsLeft: [
          {
            type: "link",
            text: "Agendamentos",
            arrowColor: "#659CC8",
            subMenuOptions: [
              {
                type: "link",
                text: "Meus Agendamentos",
                //   subText: "Stupid corporate wet blankets. Like booze ever killed anyone.",
                path: {name: "Meus Agendamentos"},
                iconLeft: '<i class="fa fa-th-list"></i>'
              },
            
              {
                type: "link",
                text: "Novo agendamento",
                // subText: "You\'re a presentation tool!",
                path: {name: "Horarios Agendamentos"},
                arrowColor: "#659CC8",
                iconLeft: '<i class="fa fa-calendar-plus-o"></i>'
              }
            ]
          },
          {
            type: "link",
            text: "Serviços",
            subMenuOptions: [
              {
                type: "link",
                text: "Serviços disponíveis",
                path: {name: "Servicos"},
                iconLeft: '<i class="fa fa-indent"></i>'
              },
               {
                type: "link",
                text: "Cadastro Serviço",
                path: {name: "Listagem Servicos"},
                iconLeft: '<i class="fa fa-indent"></i>'
              },
              // {
              //   type: "link",
              //   text: "Histórico",
              //   path: {name: "historicoServicos"},
              //   iconLeft: '<i class="fa fa-history"></i>'
              // },
              // {
              //   type: "hr",
              // },
              // {
              //   type: "link",
              //   text: "Reception",
              //   path: { name: "reception"},
              //   iconLeft: '<svg id="i-telephone" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"> <path d="M3 12 C3 5 10 5 16 5 22 5 29 5 29 12 29 20 22 11 22 11 L10 11 C10 11 3 20 3 12 Z M11 14 C11 14 6 19 6 28 L26 28 C26 19 21 14 21 14 L11 14 Z" /> <circle cx="16" cy="21" r="4" /> </svg>',
              // },
            ]
          },
           {
            type: "link",
            text: "Produtividade",
            arrowColor: "#659CC8",
            subMenuOptions: [
              {
                type: "link",
                text: "Financeiro",
                //   subText: "Stupid corporate wet blankets. Like booze ever killed anyone.",
                path: {name: "Financeiro"},
                iconLeft: '<i class="fa fa-book"></i>'
              },
            ]
          },
          {
            type: "link",
            text: "Produtos",
            arrowColor: "#659CC8",
            subMenuOptions: [
              {
                type: "link",
                text: "Cadastrar",
                //   subText: "Stupid corporate wet blankets. Like booze ever killed anyone.",
                path: {name: "Cadastro Produto"},
                iconLeft: '<i class="fa fa-book"></i>'
              },
            ]
          },
          // {
          //   type: "link",
          //   text: "Pricing",
          //   path: { name: "pricing"},
          //   iconRight: '<i class="fa fa-long-arrow-right fa-fw"></i>',
          // },
        ],
        menuOptionsRight: [
          // {
          //   type: "button",
          //   text: "Sair",
          //   path: { name: "login" },
          //   class: "button-red"
          // },
          {
            type: "link",
            text: "",
            arrowColor: "#659CC8",
            iconRight: '<i class="fa fa-user-o" style="font-size:1.7em" aria-hidden="true"></i>',
            subMenuOptions: [
              {
                // isLinkAction: true,
                type: "link",
                // text: "Login",
                text: "Sair",
                //   subText: "Stupid corporate wet blankets. Like booze ever killed anyone.",
                path: {name: "Login"},
                iconLeft: '<i class="fa fa-sign-out"></i>'
              },
              {
                type: "hr"
              },
              // {
              // 	type: "link",
              // 	text: "Novo agendamento",
              // 	// subText: "You\'re a presentation tool!",
              // 	path: { name: "cadastroAgendamento" },
              // 	arrowColor: "#659CC8",
              // 	iconLeft: '<i class="fa fa-calendar-plus-o"></i>'
              // }
            ]
          },
          // {
          //   type: "button",
          //   text: "Sair",
          //   path: { name: "Login" },
          //   iconRight: '<i style="font-size:1.7em"  class="fa fa-sign-out"></i>'
          // }
        ]
      }
    }

  },
  props: {
    menu: {
      type: Array,
    },
  },
  computed: {},
  mounted() {
    console.log(this.$route)
  },

  methods: {
    changeRoute(route) {
      console.log(route)
      // this.$router.push({name:`${route}`}).catch(() => {});
    }
  },
}
</script>

<style lang="scss">
.vnb {
  background: white;
  -webkit-box-shadow: 0px 1px 1px #E9E9E9;
  -moz-box-shadow: 0px 1px 1px #E9E9E9;
  box-shadow: 0px 1px 1px #E9E9E9;
}

// .vnb .button-red {
//   background: #ff3b30;
// }

// .vnb .button-red:hover {
//   background: #fc0d00;
// }

// .vnb {
//   .button-red {
//     background: #ff3b30;

//     &:hover {
//       background: darken(#ff3b30, 10%);
//     }
//   }
// }
</style>

