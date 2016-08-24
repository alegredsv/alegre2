/**
 * Created by awichmann on 23/08/2016.
 */
window.menuComponent = Vue.extend({
    template: `
         <nav>
                    <ul>
                    <li v-for="o in menus">
                    
                    <a v-link="{name: o.routeName}">{{o.name}}</a>
                    </li>
                     <!--   <li><a href="#" @click.prevent="showView(0)">Listar contas</a></li>
                        <li><a href="#" @click.prevent="novaConta()">Nova conta</a></li>
      -->              </ul>
                </nav>
        `,
    data: function () {
        return{
            menus: [
                // {id: 0, name: "Listar contas", url:"/bills"},
                // {id: 1, name: "Criar contas", url:"/bill/create"}
                {id: 0, name: "Listar contas", routeName:"bill.list"},
                {id: 1, name: "Criar contas", routeName:"bill.create"}
            ],
        };
    }


});