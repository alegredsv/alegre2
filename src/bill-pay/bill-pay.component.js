/**
 * Created by awichmann on 23/08/2016.
 */
window.billPayComponent = Vue.extend({
    components:{
        'menu-component': billPayMenuComponent
    },
    template:`
            <style>
        .centralizado {
            margin: 0 auto;
            float: none;
        }
        .statusRed {
            color: red;
        }
        .statusGreen {
            color: green;
        }
        .statusGray {
            color: gray;
        }
    </style>
             <div class="section">
          
               <div class="container">
                <h1 >{{ title }}</h1>
                <h3  :class="{'statusGray':  bills.length == 0 ,'statusRed':(status > 0 && bills.length > 0), 'statusGreen' : status <= 0 &&  bills.length > 0}">{{ status | totalLabel}}</h3>
                <div class="row">
                      <div class="col s5 offset-s7 offset-m4 z-depth-2 blue darken-4">
                             <h3>{{ total | numberFormat }}</h3><i class="material-icons large blue-text text-darken-3">add_circle</i>
                      </div>
                      <button class="btn yellow waves-effect waves-dark purple-text">
                      <i class="material-icons left ">add_circle</i>Meu botão</button>
                      <a class="btn">Minha ancora</a>
                      
                      <button class="btn-floating btn-large waves-effect waves-dark purple-text"><i class="material-icons left">add</i></button>
                </div>
                   <div class="row">
                   
                    <div class="col s4">
                            <div class="card blue z-depth-5">
                                <div class="card-content">
                                <p class="card-title">Meu titulo</p>
                                <p >Conteudo do cartao</p>
                                </div>
                                  <div class="card-action">
                                 <a href="#">aNCORA</a>
                            </div>
                        </div>
                    </div> 
                          <div class="col s4">
                            <div class="card-panel blue z-depth-5">
                                
                                <p >Conteudo do cartao</p>
                                
                        </div>
                    </div> 
                    
                    
                             
                    <div class="col s4">
                            <div class="card yellow">
                            <div class="card-image">
                                    <img src="https://thenypost.files.wordpress.com/2016/04/85517981.jpg?quality=90&strip=all&w=978&h=652&crop=1">
</div>  
                                <div class="card-content">
                                <p class="card-title">Meu titulo</p>
                                <p >Conteudo do cartao</p>
                                </div>
                                  <div class="card-action">
                                 <a href="#">aNCORA</a>
                            </div>
                        </div>
                    </div> 
                </div>
             </div>
               
                <router-view></router-view>
               <!-- <div v-show="activedView == 0" class="col-xs-12 col-md-8">
                        <bill-list-component v-ref:bill-list-component></bill-list-component>
                </div>
                <div v-show="activedView == 1" class="col-xs-12 col-md-8">
                <bill-create-component :bill.sync="bill" ></bill-create-component>
                </div>
                </div>-->
                `,

    data() {
        return{
            teste: '',
            title: "Contas a pagar",
            status : false,
            billCount: 0,

            total: 0,

            /*  bills:[{date_due:'20/08/2016', name: 'Conta de luz', value:127.99,done:1},
             {date_due:'21/08/2016', name: 'Conta de água', value:40.99,done:0},
             {date_due:'22/08/2016', name: 'Conta de telefone', value:55.99,done:0},
             {date_due:'23/08/2016', name: 'Supermercado', value:625.99,done:0},
             {date_due:'24/08/2016', name: 'Cartão de crédito', value:1200.99,done:0},
             {date_due:'25/08/2016', name: 'Empréstimo', value:25.99,done:1},
             {date_due:'26/08/2016', name: 'Gasolina', value:155.99,done:0}]*/

           // bills: []
        };
    },
   /* computed: {
        status: function () {


            var count = 0;
            var billListComponent =  this.$root.$children[0];

            for (var i in billListComponent.billsPay) {
                if (!billListComponent.billsPay[i].done) {
                    count++;
                }
            }
            this.billCount = count;
            return !count ? 'Nenhuma conta a pagar' : 'Existem ' + count + ' contas a pagar';
        }
    }*/
    created() {
        this.updateStatus();
        this.updateTotal();
    },
    methods:{
        
        caculateStatus(bills) {

            if(!bills.length){
                this.status = false
            }

            let count = 0;
            var billListComponent =  this.$root.$children[0];

            for (let i in bills) {

                if (!bills[i].done) {

                    count++;
                }
            }
            this.status = count;


        },
        updateStatus() {

            Bill.query().then((response)=>{
                this.caculateStatus(response.data);
            });
        },
        updateTotal() {
           
            Bill.total().then((response)=>{
                this.total = response.data.total;
            });
        }
        
    },
    events:{
        'change-info'() {
            this.updateStatus();
            this.updateTotal();
        }
    }
});