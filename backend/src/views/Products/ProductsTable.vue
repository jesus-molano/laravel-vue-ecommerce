<script setup>
import { onMounted, ref } from 'vue'
import { useProductsStore } from '@/stores'
import { LoadingSpinner, TableHeaderCell } from '@/components'
import { PRODUCTS_PER_PAGE } from '@/constants'

const perPage = ref(PRODUCTS_PER_PAGE)
const search = ref('')
const products = useProductsStore()
const sortField = ref('updated_at')
const sortDirection = ref('desc')

onMounted(() => {
  getProducts()
})

function getProducts (url = null) {
  products.getProducts(
    url,
    search.value,
    perPage.value,
    sortField.value,
    sortDirection.value
  )
}

function getForPage (event, link) {
  if (!link.url || link.active) {
    return
  }
  getProducts(link.url)
}
function sortProduct (field) {
  if (sortField.value === field) {
    if (sortDirection.value === 'asc') {
      sortDirection.value = 'desc'
    } else {
      sortDirection.value = 'asc'
    }
  } else {
    sortField.value = field
    sortDirection.value = 'asc'
  }
  getProducts()
}
</script>

<template>
  <div
    class="bg-white p-4 rounded-lg shadow flex flex-col justify-center items-center sm:min-h-[600px] min-h-screen sm:mx-2"
  >
    <div class=" flex justify-between border-b-2 pb-3 w-full">
      <div class="flex items-center">
        <label for="perPage" class="whitespace-nowrap mr-3">Per Page</label>
        <select
          @change="getProducts()"
          v-model="perPage"
          name="perPage"
          id="perPage"
          class="sm:text-small focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none rounded-md text-gray-900 placeholder-gray-500 border-gray-300 border py-2 px-3 w-24 block relative appearance-none"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
      <div>
        <input
          type="search"
          v-model="search"
          @change="getProducts()"
          class="sm:text-small focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none rounded-md text-gray-900 placeholder-gray-500 border-gray-300 border py-2 px-3 w-48 block relative appearance-none"
          placeholder="Type to Search products"
        />
      </div>
    </div>
    <table class="table-auto w-full flex-1">
      <thead>
        <tr>
          <TableHeaderCell
            @click="sortProduct"
            field="id"
            :sortField="sortField"
            :sortDirection="sortDirection"
            >ID</TableHeaderCell
          >
          <TableHeaderCell
            field="image"
            :sortField="sortField"
            :sortDirection="sortDirection"
            >Image</TableHeaderCell
          >
          <TableHeaderCell
            @click="sortProduct"
            field="title"
            :sortField="sortField"
            :sortDirection="sortDirection"
            >Title</TableHeaderCell
          >
          <TableHeaderCell
            @click="sortProduct"
            field="price"
            :sortField="sortField"
            :sortDirection="sortDirection"
            >Price</TableHeaderCell
          >
          <TableHeaderCell
            @click="sortProduct"
            field="updated_at"
            :sortField="sortField"
            :sortDirection="sortDirection"
            >Last Updated At</TableHeaderCell
          >
        </tr>
      </thead>
      <tbody v-if="products.loading">
        <tr class="w-full">
          <td colspan="5">
            <LoadingSpinner
              width="10"
              height="10"
              darkColor="text-indigo-700"
              class="flex-1 mx-auto"
            />
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr v-for="product of products.data" :key="product.id">
          <td class="border-b p2">{{ product.id }}</td>
          <td class="border-b p2">
            <img class="w-16" :src="product.image" :alt="product.title" />
          </td>
          <td
            class="border-b p2 max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis"
          >
            {{ product.title }}
          </td>
          <td class="border-b p2">{{ product.price }}</td>
          <td class="border-b p2">{{ product.updated_at }}</td>
        </tr>
      </tbody>
    </table>
    <div
      v-if="!products.loading"
      class="flex justify-between items-center mt-5 gap-2"
    >
      <span> Showing from {{ products.from }} to {{ products.to }} </span>
      <nav
        v-if="products.total > products.limit"
        class="relative z-0 inline-flex justify-center rounded-md shadow-sm -space-x-px"
        aria-label="Pagination"
      >
        <a
          href="#"
          v-for="(link, i) of products.links"
          :key="i"
          :disabled="!link.url"
          @click.prevent="getForPage($event, link)"
          aria-current="page"
          class="relative inline-flex items-center px-4 py-2 border text-sm font-medium whitespace-nowrap"
          v-html="link.label"
          :class="[
            link.active
              ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
            i === 0 && 'rounded-l-md',
            i === products.links.length - 1 && 'rounded-r-md',
            !link.url && 'bg-gray-100 text-gray-700 cursor-not-allowed'
          ]"
        >
        </a>
      </nav>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
