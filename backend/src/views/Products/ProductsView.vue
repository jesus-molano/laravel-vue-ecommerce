<script setup>
import { ref } from 'vue'
import ProductsTable from './ProductsTable.vue'
import ProductModal from './ProductModal.vue'

const displayedModal = ref(false)
const productModel = ref({
  id: '',
  title: '',
  image: '',
  description: '',
  price: ''
})

function showProductModal () {
  displayedModal.value = true
}

</script>

<template>
  <div class="dark:text-white flex items-center justify-between mb-3 pt-4 px-4">
    <h1 class="text-3xl font-semibold">Products</h1>
    <button
      @click='showProductModal'
      class="flex justify-center py-2 px-4 border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500"
    >
      Add new Product
    </button>
  </div>
  <ProductModal v-model='displayedModal' :product='productModel'/>
  <ProductsTable />
</template>
<style lang="scss" scoped></style>
