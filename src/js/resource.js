
Vue.http.options.root = 'http://192.168.10.10:8001/api';
window.Bill = Vue.resource('bills{/id}',{},{
    total:{method:'GET', url:'bills/total'}
});

window.BillReceived = Vue.resource('billsReceived{/id}',{},{
    total:{method:'GET', url:'billsReceived/total'}
});