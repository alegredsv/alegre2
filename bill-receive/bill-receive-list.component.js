/**
 * Created by awichmann on 23/08/2016.
 */
window.billReceiveListComponent = Vue.extend({
    template:` <table class="table">
                        <thead>
                        <tr>
                            <td>#</td>
                            <td>Cliente</td>
                            <td>Serviço</td>
                            <td>Valor</td>
                            <td>Recebido?</td>
                            <td>Data recebimento</td>
                            <td>Ações</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(index, o) in bills">
                            <td>{{ index +1 }}</td>
                            <td>{{ o.name }}</td>
                            <td>{{ o.service }}</td>                        
                            <td>{{ o.value | currency 'R$ '}}</td>
                            <td>{{ o.done | receiveLabel }}</td>
                              <td>{{ o.date_due }}</td>
                            <td>
                               <!-- <span style="margin: 5px;cursor: pointer;" @click.prevent="editaConta(o)"   title="Editar" aria-hidden="true" class="glyphicon glyphicon-pencil"></span>-->
                               <span style="margin: 5px;cursor: pointer;" v-link="{name: 'bill-receive.update', params:{id:o.id}}"  title="Editar" aria-hidden="true" class="glyphicon glyphicon-pencil"></span>
                               <span @click.prevent="excluiConta(o);" title="Exluir" aria-hidden="true" class="glyphicon glyphicon-remove"></span>
                                <span @click.prevent="baixaConta(o, true, index);" title="Marcar como paga" aria-hidden="true" class="glyphicon glyphicon-thumbs-up"></span>
                                <span @click.prevent="baixaConta(o, false, index);" title="Marcar como não paga" aria-hidden="true" class="glyphicon glyphicon-thumbs-down"></span>
                             </td>
                        </tr>
                        </tbody>
                    </table>
                `,
    data:function () {
        return{
          bills: []
        };
    },


    created:function() {
        // var resource = this.$resource('bills{/id}');
        var self = this;
        BillReceived.query().then(function(response){
            self.bills = response.data;
        })
    },
    methods:{
         excluiConta: function (bill) {
             var self = this;
            var confimra = confirm("Deseja excluir a conta?");
            if (bill.id > -1 && confimra) {
              //  this.$root.$children[0].billsReceive.splice(index, 1);
                BillReceived.delete({'id':bill.id}).then(function(response){
                    self.bills.$remove(bill);
                    self.$router.go({name:'bill-receive.list'});
                });
                self.$dispatch('change-info-receive');

            }

        },
        baixaConta: function (bill, status, index) {
            bill.done = status;
            // this.$root.$children[0].billsPay[index] = bill;
            var self = this;
            BillReceived.put('bills/'+bill.id,bill).then(function(response){
                self.$dispatch('change-info-receive');
                self.$router.go({name:'bill-receive.list'});
            });
        }
    }
});
