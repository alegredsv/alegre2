import LoginComponent from './components/Login.vue';
import DashboardComponent from './components/Dashboard.vue';
import LogoutComponent from './components/Logout.vue';

import BankAccountListComponent from './components/bank-account/BankAccountList.vue';
import BankAccountCreateComponent from './components/bank-account/BankAccountCreate.vue';
import BankAccountUpdateComponent from './components/bank-account/BankAccountUpdate.vue';
export default{
    '/login' :{
        name: 'auth.login',
        component: LoginComponent,
        auth: false
    },
    '/logout' :{
        name: 'auth.logout',
        component: LogoutComponent,
        auth: true
    },
    '/dashboard':{
        name : 'dashboard',
        component : DashboardComponent,
        auth: true
    },
    '/bank-accounts':{
        component:{template :"<router-view></router-view>"},
        subRoutes:{
            '/':{
                name:'bank-account.list',
                component:BankAccountListComponent
            },
            '/:id/update':{
                name: 'bank-account.update',
                component:BankAccountUpdateComponent
            },
            '/create':{
                name: 'bank-account.create',
                component:BankAccountCreateComponent
            }
        }
    }
}