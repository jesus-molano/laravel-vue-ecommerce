<script setup>
import { ref } from 'vue'
import { useProductsStore } from '@/stores'
import ProductsTable from './ProductsTable.vue'
import ProductModal from './ProductModal.vue'
import { DEFAULT_EMPTY_PRODUCT } from '@/constants.js'

const products = useProductsStore()
const displayedModal = ref(false)
const productModel = ref(DEFAULT_EMPTY_PRODUCT)

function showProductModal () {
  displayedModal.value = true
}

function editProduct (product) {
  products.getProduct(product.id)
    .then(({ data }) => {
      productModel.value = data
      showProductModal()
    })
}

function onModalClose () {
  productModel.value = DEFAULT_EMPTY_PRODUCT
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
  <ProductModal v-model='displayedModal' :product='productModel' @close='onModalClose'/>
  <ProductsTable @clickEdit='editProduct' />
</template>
<style lang="scss" scoped></style>
