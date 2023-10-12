<template>
    <FloatingLabel
        :config="{label: label, scale:false}"
        v-show="visible"
        :class="modelValue ? 'input__container--content' : ''"
    >
       <b-form-input
          v-if="!isMultiselect"
          class="customInput"
          size="md"
          v-model="vmodel"
          @change="onChange"
          :state="state"
          :formatter="formatter"
          :type="inputType"
        >
        </b-form-input>
        
        <div  v-else class="p-2">
            
        <multiselect
          class="customInput"
          size="md" 
          v-model="vmodel" 
          @select="onChange"
          :options="multiselectOptions"
          :label="labelsMultiselect" 
          :track-by="labelsMultiselect"
          selectLabel="Selecione"
          selectedLabel="Selecionado"
          deselectLabel="Remover seleção"
          tag-placeholder=""
          placeholder=""
        >
          <template v-slot:noOptions>Sem registros</template>
          <template v-slot:noResult>Nenhum registro encontrado</template>
        </multiselect>
        </div>

  </FloatingLabel>
</template>

<script>
import FloatingLabel from 'vue-simple-floating-labels'
import Multiselect from 'vue-multiselect'


export default {
  name: 'CustomInput',
  components: {
    FloatingLabel,
    Multiselect
  },
  data(){
    return{
      vmodel :undefined,
      state: undefined,
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
    modelValue: {

    },
    placeholder: {
      type: String,
    },
    valid: {
      type: String,
      default: null,
    },
    isMultiselect :{
      type: Boolean,
      default:false
    },
    multiselectOptions: {
      type: Array,
      required: false,
      // default:[]
    },
    visible: {
      type: Boolean,
      required: false,
      default:true
    },
    formatter:{
        type: String,
    },
    labelsMultiselect: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "",
    },
    inputType:{
        default:"text"
    }
  },
  computed: {
    name() {
      return this.id;
    },
  },

  mounted(){
    if(this.modelValue){
        this.vmodel = this.modelValue
    };

    if(this.formatter){
        try{
            if(this.formatter()){
                this.formatter = this.formatter;
            }
        }catch(_){
            this.formatter = eval(this.formatter)
        }
    }
  },

  methods: {
    onChange(value) {
        let parsedValue = value;

        if (!isNaN(parsedValue)) {
            parsedValue = parseFloat(value);
        };

        this.$emit('changeValue', { [this.name]: parsedValue });
    },

  },
}
</script>
<style>
.customInput {
  /* margin-top:15px; */
  /* padding:0 */
  /* height: 200px !important; */

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

.customInput:focus,
.multiselect:focus {
   outline: none !important;
}

.customInput,
.multiselect {
  border: none !important;
  background-color: transparent;
  padding-top: 1vw;
}


  fieldset[disabled] .multiselect{
    pointer-events:none
  }
  .multiselect__spinner{
      position:absolute;
      right:1px;
      top:1px;
      width:48px;
      height:35px;
      background:#fff;
      display:block
  }
  .multiselect__spinner:after,.multiselect__spinner:before{
      position:absolute;
      content:"";
      top:50%;
      left:50%;
      margin:-8px 0 0 -8px;
      width:16px;
      height:16px;
      border-radius:100%;
      border:2px solid transparent;
      border-top-color:var(--cor-principal);
      box-shadow:0 0 0 1px transparent
  }
  .multiselect__spinner:before{
      animation:spinning 2.4s cubic-bezier(.41,.26,.2,.62);
      animation-iteration-count:infinite
  }
  .multiselect__spinner:after{
      animation:spinning 2.4s cubic-bezier(.51,.09,.21,.8);
      animation-iteration-count:infinite
  }
  .multiselect__loading-enter-active,.multiselect__loading-leave-active{
      transition:opacity .4s ease-in-out;
      opacity:1
  }
  .multiselect__loading-enter,.multiselect__loading-leave-active{
      opacity:0
  }
  .multiselect,.multiselect__input,.multiselect__single{
      font-family:inherit;
      font-size:16px;
      -ms-touch-action:manipulation;
      touch-action:manipulation
  }
  .multiselect{
      box-sizing:content-box;
      display:block;
      position:relative;
      width:calc(100% - 72px);
      /* min-height:37px; */
      height: 23px;
      text-align:left;
      color:#35495e
  }
  .multiselect *{
      box-sizing:border-box
  }
  .multiselect:focus{
      outline:none
  }
  .multiselect--disabled{
      background:#ededed;
      pointer-events:none;
      opacity:.6
  }
  .multiselect--active{
      z-index:50
  }
  .multiselect--active:not(.multiselect--above) .multiselect__current,.multiselect--active:not(.multiselect--above) .multiselect__input,.multiselect--active:not(.multiselect--above) .multiselect__tags{
      border-bottom-left-radius:0;
      border-bottom-right-radius:0
  }
  .multiselect--active .multiselect__select{
      transform:rotate(180deg);
  }
  .multiselect--above.multiselect--active .multiselect__current,.multiselect--above.multiselect--active .multiselect__input,.multiselect--above.multiselect--active .multiselect__tags{
      border-top-left-radius:0;
      border-top-right-radius:0
  }
  .multiselect__input,.multiselect__single{
      position:relative;
      display:inline-block;
      min-height:20px;
      line-height:20px;
      border:none;
      border-radius:5px;
      background:transparent;
      padding:0 0 0 5px;
      width:100%;
      transition:border .1s ease;
      box-sizing:border-box;
      margin-bottom:8px;
      vertical-align:top
  }
  .multiselect__input:-ms-input-placeholder{
      color:#35495e
  }
  .multiselect__input::placeholder{
      color:#35495e
  }
  .multiselect__tag~.multiselect__input,.multiselect__tag~.multiselect__single{
      width:auto
  }
  .multiselect__input:hover,.multiselect__single:hover{
      border-color:#cfcfcf
  }
  .multiselect__input:focus,.multiselect__single:focus{
      border-color:#a8a8a8;
      outline:none
  }
  .multiselect__single{
      padding-left:5px;
      margin-bottom:8px;
      white-space: nowrap;
      overflow: hidden; 
  }
  .multiselect__tags-wrap{
      display:inline
  }
  .multiselect__tags{
      min-height:38px;
      display:block;
      padding:8px 38px 0 8px;
      border-radius:5px;
      /* border:1px solid #e8e8e8; */
      background:transparent;
      font-size:14px
  }
  .multiselect__tag{
      position:relative;
      display:inline-block;
      padding:4px 26px 4px 10px;
      border-radius:5px;
      margin-right:10px;
      color:transparent;
      line-height:1;
      background:var(--cor-principal);
      margin-bottom:5px;
      white-space:nowrap;
      overflow:hidden;
      max-width:100%;
      text-overflow:ellipsis
  }
  .multiselect__tag-icon{
      cursor:pointer;
      margin-left:7px;
      position:absolute;
      right:0;
      top:0;
      bottom:0;
      font-weight:700;
      font-style:normal;
      width:22px;
      text-align:center;
      line-height:22px;
      transition:all .2s ease;
      border-radius:5px
  }
  .multiselect__tag-icon:after{
      content:"\D7";
      color:#266d4d;
      font-size:14px
  }
  .multiselect__tag-icon:focus,.multiselect__tag-icon:hover{
      background:#369a6e
  }
  .multiselect__tag-icon:focus:after,.multiselect__tag-icon:hover:after{
      color:transparent
  }
  .multiselect__current{
      min-height:38px;
      overflow:hidden;
      padding:8px 30px 0 12px;
      white-space:nowrap;
      border-radius:5px;
      border:1px solid #e8e8e8
  }
  .multiselect__current,.multiselect__select{
      line-height:16px;
      box-sizing:border-box;
      display:block;
      margin:0;
      text-decoration:none;
      cursor:pointer
  }
  .multiselect__select{
      position:absolute;
      /* width:40px; */
      /* height:38px; */
      right:1px;
      top:1px;
      padding:4px 8px;
      text-align:center;
      transition:transform .2s ease
  }
  .multiselect__select:before{
      position:relative;
      right:0;
      top:65%;
      color:#999;
      margin-top:4px;
      border-color:#999 transparent transparent;
      border-style:solid;
      border-width:5px 5px 0;
      content:""
  }
  .multiselect__placeholder{
      color:#adadad;
      /*display:inline-block;*/
      margin-bottom:10px;
      padding-top:2px;
  }
  .multiselect--active .multiselect__placeholder{
      display:none
  }
  .multiselect__content-wrapper{
      position:absolute;
      display:block;
      background:#fff;
      width:100%;
      max-height:240px;
      overflow:auto;
      border:1px solid #e8e8e8;
      border-top:none;
      border-bottom-left-radius:5px;
      border-bottom-right-radius:5px;
      z-index:50;
      -webkit-overflow-scrolling:touch
  }
  .multiselect__content{
      list-style:none;
      display:inline-block;
      padding:0;
      margin:0;
      min-width:100%;
      vertical-align:top
  }
  .multiselect--above .multiselect__content-wrapper{
      bottom:100%;
      border-bottom-left-radius:0;
      border-bottom-right-radius:0;
      border-top-left-radius:5px;
      border-top-right-radius:5px;
      border-bottom:none;
      border-top:1px solid #e8e8e8
  }
  .multiselect__content::webkit-scrollbar{
      display:none
  }
  .multiselect__element{
      display:block
  }
  .multiselect__option{
      display:block;
      padding:12px;
      min-height:38px;
      line-height:16px;
      text-decoration:none;
      text-transform:none;
      vertical-align:middle;
      position:relative;
      cursor:pointer;
      white-space:nowrap
  }
  .multiselect__option:after{
      top:0;
      right:0;
      position:absolute;
      line-height:38px;
      padding-right:12px;
      padding-left:20px;
      font-size:13px
  }
  .multiselect__option--highlight{
      background:var(--cor-principal);
      outline:none;
      /* color:#fff */
  }
  .multiselect__option--highlight:after{
      content:attr(data-select);
      background:var(--cor-principal);
      /* color:#fff */
  }
  .multiselect__option--selected{
      background:#f3f3f3;
      color:#35495e;
      font-weight:700
  }
  .multiselect__option--selected:after{
      content:attr(data-selected);
      color:silver
  }
  .multiselect__option--selected.multiselect__option--highlight{
      background:var(--cor-principal-claro);
      color:#fff
  }
  .multiselect__option--selected.multiselect__option--highlight:after{
      background:var(--cor-principal-claro);
      content:attr(data-deselect);
      color:#fff
  }
  .multiselect--disabled .multiselect__current,.multiselect--disabled .multiselect__select{
      background:#ededed;
      color:#a6a6a6
  }
  .multiselect__option--disabled{
      background:#ededed!important;
      color:#a6a6a6!important;
      cursor:text;
      pointer-events:none
  }
  .multiselect__option--group{
      background:#ededed;
      color:#35495e
  }
  .multiselect__option--group.multiselect__option--highlight{
      background:#35495e;
      color:#fff
  }
  .multiselect__option--group.multiselect__option--highlight:after{
      background:#35495e
  }
  .multiselect__option--disabled.multiselect__option--highlight{
      background:#dedede
  }
  .multiselect__option--group-selected.multiselect__option--highlight{
      background:var(--cor-principal-claro);
      color:#fff
  }
  .multiselect__option--group-selected.multiselect__option--highlight:after{
      background:var(--cor-principal-claro);
      content:attr(data-deselect);
      color:#fff
  }
  .multiselect-enter-active,.multiselect-leave-active{
      transition:all .15s ease
  }
  .multiselect-enter,.multiselect-leave-active{
      opacity:0
  }
  .multiselect__strong{
      margin-bottom:8px;
      line-height:20px;
      display:inline-block;
      vertical-align:top
  }
    .emptySelect .multiselect__content li:last-child{
        display: block !important;
    }
  [dir=rtl] .multiselect{
      text-align:right
  }
  [dir=rtl] .multiselect__select{
      right:auto;
      left:1px
  }
  [dir=rtl] .multiselect__tags{
      padding:8px 8px 0 38px
  }
  [dir=rtl] .multiselect__content{
      text-align:right
  }
  [dir=rtl] .multiselect__option:after{
      right:auto;
      left:0
  }
  [dir=rtl] .multiselect__clear{
      right:auto;
      left:12px
  }
  [dir=rtl] .multiselect__spinner{
      right:auto;
      left:1px
  }
  @keyframes spinning{
      0%{
          transform:rotate(0)
      }
      to{
          transform:rotate(2turn)
      }
  }
  


</style>
