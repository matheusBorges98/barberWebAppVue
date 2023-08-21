/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'
import checkAuth from '../middlewares/Auth'

Vue.use(VueRouter)

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

router.beforeEach(async (to, from, next) => {
    // console.log(to, from)
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (true == true) {
            next()
        } else {
            next('/')
        }
    } else {
        next()
    }
});

export default router