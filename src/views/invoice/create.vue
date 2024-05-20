<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>Create Invoice</h4>
                        <hr>
                        <form @submit.prevent="store">
                            <div class="form-group mt-3">
                                <label for="branch_name" class="fw-semibold">Branch Name</label>
                                <input type="text" class="form-control" v-model="invoice.branch_name" placeholder="Enter Branch Name">
                            </div>
                            <div class="form-group mt-3">
                                <label for="customer_name" class="fw-semibold">Customer Name</label>
                                <input type="text" class="form-control" v-model="invoice.customer_name" placeholder="Enter Customer Name">
                            </div>
                            <div class="form-group mt-3">
                                <label for="sales_person" class="fw-semibold">Sales Person</label>
                                <input type="text" class="form-control" v-model="invoice.sales_person" placeholder="Enter Sales Person">
                            </div>
                            <div class="form-group mt-3">
                                <label for="date" class="fw-semibold">Date</label>
                                <input type="date" class="form-control" v-model="invoice.date" placeholder="Enter Date">
                            </div>
                            <hr class="mt-4"/>
                            <div class="form-group mt-3">
                                <label for="items" class="fw-semibold mb-3">Items</label>
                                <div v-for="(item, index) in invoice.items" :key="index" class="item-group mb-4 d-flex gap-2">
                                    <div class="form-group">
                                        <label class="fw-semibold"><small>Item Name</small></label>
                                        <input class="form-control form-control-sm" type="text" v-model="item.item_name" placeholder="Item Name">
                                    </div>
                                    <div class="form-group">
                                        <label class="fw-semibold"><small>Quantity</small></label>
                                        <input class="form-control form-control-sm" type="number" v-model="item.quantity" placeholder="Quantity">
                                    </div>
                                    <div class="form-group">
                                        <label class="fw-semibold"><small>Price</small></label>
                                        <input class="form-control form-control-sm" type="number" v-model="item.price" placeholder="Price">
                                    </div>
                                </div>
                                <div class="d-flex justify-content-end">
                                    <button class="btn btn-success" type="button" @click="addItem">Add Item</button>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary">Save</button>
                        </form>

                        <div v-if="validation.length" class="mt-2 alert alert-danger">
                            <ul>
                                <li v-for="(error, index) in validation" :key="index">{{ error }}</li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
    setup() {
        const invoice = reactive({
            branch_name: '',
            customer_name: '',
            sales_person: '',
            date: '',
            items: [
                {
                    item_name: '',
                    quantity: 1,
                    price: 0
                }
            ]
        });

        const validation = ref([]);

        const router = useRouter();

        function store() {
            axios.post('http://127.0.0.1:8000/api/v1/create/sales-invoice', invoice)
                .then(() => {
                    router.push({ name: 'invoice.index' });
                })
                .catch(error => {
                    validation.value = error.response.data.errors || ['An error occurred'];
                });
        }

        function addItem() {
            invoice.items.push({ item_name: '', quantity: 1, price: 0 });
        }

        return {
            invoice,
            validation,
            router,
            store,
            addItem
        };
    }
}
</script>

<style>
    body {
        background: lightgray;
    }
</style>
