import Vue from 'vue';

const mixin = {


    data() {
        return {
            
        };
    },

    created() {
      
    },

    mounted() {        
       
    },

    updated() {

    },

    methods: {
        $updateStoreUserData(data){
            this.$store.commit(`setPropriedades`, {userData : {...data}});        
        }
    },


   };
 
   export default mixin;