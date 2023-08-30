/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'
import checkAuth from '../middlewares/Auth'

Vue.use(VueRouter)

// if(this.$route.query && this.$route.query.subdominio && this.$route.query.subdominio != ""){
//     Vue.prototype.$subdominio = this.$route.query.subdominio
// }else{
//     Vue.prototype.$subdominio = "semsubdominio"
// }


const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            requiresAuth: false,
        },
        component: () =>
            import('../pages/login/Login'),
    },
    {
        path: '/estabelecimentos',
        name: 'Estabelecimentos',
        meta: {
            requiresAuth: false,
        },
        component: () =>
            import('../pages/estabelecimento/SelecaoEstabelecimento'),
    },
    {
        path: '/servicos',
        name: 'Servicos',
        meta: {
            requiresAuth: true,
        },
        component: () =>
            import('../pages/servicos/Servicos'),
    },
    {
        path: '/home',
        name: 'Home',
        meta: {
            requiresAuth: true,
        },
        component: () => import('../pages/home/Home'),
    },
    {
        path: '/horariosAgendamentos',
        name: 'Horarios Agendamentos',
        props: true,
        meta: {
            requiresAuth: true,
        },
        component: () => import('../pages/agendamentos/HorariosAgendamento'),
    },
    {
        path: '/detalhesAgendamento',
        name: 'Detalhes Agendamento',
        props: true,
        meta: {
            requiresAuth: true,
        },
        component: () => import('../pages/agendamentos/DetalhesAgendamento'),
    },
    {
        path: '/cadastroAgendamento',
        name: 'Cadastro Agendamento',
        props: true,
        meta: {
            requiresAuth: true,
        },
        component: () => import('../pages/agendamentos/CadastroAgendamento'),
    },

    {
        path: '/meusAgendamentos',
        name: 'Meus Agendamentos',
        props: true,
        meta: {
            requiresAuth: true,
        },
        component: () => import('../pages/agendamentos/MeusAgendamentos'),
    },

    {
        path: '/prestadores',
        name: 'Prestadores',
        props: true,
        meta: {
            requiresAuth: true,
        },
        component: () => import('../pages/agendamentos/SelecaoPrestadorServico'),
    },
]

const router = new VueRouter({
    routes,
})

// const isAuthenticated = async (login, senha) =>{
//   return checkAuth(login, senha)
// }

// router.beforeEach(async (to, from, next) => {
//     console.log(to)
//     if (to.matched.some((record) => record.meta.requiresAuth)) {
//         console.log("0")
//         if (true == true) {
//             next()
//             console.log("1")
//         } else {
//             console.log("2")
//             next('/')
//         }
//     } else {
//         console.log("3")
//         if(!to.query.id){
//             next('/estabelecimentos')
//         }else{
//             next()
//         }
        
//     }
// });
// router.beforeEach(async (to, from, next) => {
//     if (to.matched.some(record => record.meta.requiresAuth)) {
//         if (true) {
//             next();
//         } else {
//             next('/');
//         }
//     } else {
//         if (!to.query.id && to.name != "Estabelecimentos") {
//             next('/estabelecimentos');
//         } else {
//             next();
//         }
//     }
// });
router.beforeEach(async (to, from, next) => {
    Vue.prototype.$subdominio = to.query.subdominio;

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (true === true) {
            next();
        } else {
            next('/'); // Redirecione para a página de login ou outra página de erro
        }
    } else {
        // Em rotas não autenticadas, irá validar se há um subdominio na query params.
        if (!to.query.subdominio && to.name !== "Estabelecimentos") {
            next('/estabelecimentos');
        } else {
            next();
        }
    }

});

export default router