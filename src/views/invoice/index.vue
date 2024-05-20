<template>
   <div class="container mt-5">
       <div class="row">
           <div class="col-md-12">
               <div class="card border-0 rounded shadow">
                   <div class="card-body">
                       <h4>Data Invoice</h4>
                       <hr>
                       <router-link :to="{name: 'invoice.create'}" class="btn btn-md btn-success">Add Invoice</router-link>

                       <table class="table table-striped table-bordered mt-4">
                           <thead class="thead-dark">
                               <tr>
                                   <th scope="col">Invoice Number</th>
                                   <th scope="col">Sales Person</th>
                                   <th scope="col">Customer Name</th>
                                   <th scope="col">SO date</th>
                                   <th scope="col">Action</th>
                               </tr>
                           </thead>
                           <tbody>
                               <tr v-for="(invoice, index) in invoices" :key="index">
                                   <td>{{ invoice.invoice_number }}</td>
                                   <td>{{ invoice.sales_person }}</td>
                                   <td>{{ invoice.customer_name }}</td>
                                   <td>{{ invoice.date }}</td>
                                   <td class="d-flex justify-content-center gap-1">
                                       <router-link :to="{name: 'invoice.detail', params:{id: invoice.id }}" class="btn btn-sm btn-warning mr-1">Detail</router-link>
                                       <router-link :to="{name: 'invoice.edit', params:{id: invoice.id }}" class="btn btn-sm btn-primary mr-1">Edit</router-link>
                                       <button @click="confirmDelete(invoice.id)" class="btn btn-sm btn-danger ml-1">Delete</button>
                                   </td>
                               </tr>
                           </tbody>
                       </table>

                   </div>
               </div>
           </div>
       </div>
   </div>
</template>

<script>
import axios from 'axios'
import { onMounted, ref } from 'vue'

export default {

   setup() {
      let invoices = ref([])

      onMounted(() => {
         axios.get('http://localhost:8000/api/v1/get/sales-invoices')
         .then(response => {
            invoices.value = response.data.data

         }).catch(error => {
            console.log(error.response.data)
         })
      })

      const invoiceDelete = (id) => {
         axios.delete(`http://localhost:8000/api/v1/delete/sales-invoice/${id}`)
         .then(() => {
            invoices.value = invoices.value.filter(invoice => invoice.id !== id)
         })
         .catch(error => {
            console.log(error.response.data)
         })
      }

      const confirmDelete = (id) => {
         if (window.confirm("Are you sure you want to delete this invoice?")) {
            invoiceDelete(id);
         }
      }

      return {
         invoices,
         confirmDelete
      }

   }
}
</script>

<style>
   body {
      background: lightgray;
   }
</style>