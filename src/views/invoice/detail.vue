<template>
   <div class="container mt-5">
     <div class="row">
       <div class="col-md-12">
         <div class="card border-0 p-4 rounded shadow">
            <h5 class="fw-bold">Invoice Number : {{ invoice.invoice_number }}</h5>
            <hr>
            <div class="mb-3">
               <strong>Date :</strong> {{ formatDate(invoice.date) }}
            </div>
            <div class="mb-3">
               <strong>Customer Name :</strong> {{ invoice.customer_name }}
            </div>
            <div class="mb-3">
               <strong>Sales Person :</strong> {{ invoice.sales_person }}
            </div>
            <hr>
            <table class="table table-striped table-bordered mt-4">
            <thead class="thead-dark">
               <tr>
                  <th scope="col">Item Name</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                  <th scope="col">Total</th>
               </tr>
            </thead>
            <tbody>
               <tr v-for="(item, index) in invoice.items" :key="index">
                  <td>{{ item.item_name }}</td>
                  <td>{{ item.quantity }}</td>
                  <td>{{ formatCurrency(item.price) }}</td>
                  <td>{{ formatCurrency(item.total) }}</td>
               </tr>
            </tbody>
            </table>
            <div class="mt-3 d-flex justify-content-between">
               <div>
                  <strong>Total Quantity:</strong> {{ totalQty }}
               </div>
               <div>
                  <strong>Grand Total:</strong> {{ formatCurrency(finalTotal) }}
               </div>
            </div>
         </div>
       </div>
     </div>
   </div>
</template>

 

<script>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

export default {
   setup() {
      const route = useRoute();
      const invoice = ref({
         invoice_number: '',
         status: '',
         date: '',
         return: false,
         customer_name: '',
         sales_person: '',
         created_by: '',
         remarks: '',
         items: []
      });

      const totalQty = ref(0);
      const finalTotal = ref(0);

      const formatCurrency = (amount) => {
         return new Intl.NumberFormat('id-ID', {
         style: 'currency',
         currency: 'IDR',
         minimumFractionDigits: 0
         }).format(amount);
      };

      const formatDate = (dateStr) => {
         const date = new Date(dateStr);
         return date.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      };

      onMounted(() => {
         const invoiceId = route.params.id;
         axios.get(`http://127.0.0.1:8000/api/v1/get/sales-invoice/${invoiceId}`)
         .then(response => {
            const data = response.data.data;
            invoice.value = data;

            totalQty.value = data.items.reduce((acc, item) => acc + item.quantity, 0);
            finalTotal.value = data.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
         })
         .catch(error => {
            console.log(error.response.data);
         });
      });

      return {
         invoice,
         totalQty,
         finalTotal,
         formatCurrency,
         formatDate
      };
  }
}
</script>


<style>
body{
    background: lightgray;
}
</style>
