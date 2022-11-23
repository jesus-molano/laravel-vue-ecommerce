<script setup>
import { onMounted, ref } from 'vue'
import { useProductsStore } from '@/stores'
import { LoadingSpinner, TableHeaderCell } from '@/components'
import { PRODUCTS_PER_PAGE } from '@/constants'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import {
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/vue/24/outline'

const emits = defineEmits(['clickEdit'])

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

function editProduct (product) {
  emits('clickEdit', product)
}

function deleteProduct (product) {
  if (!confirm('Are you sure you want to delete the product?')) {
    return null
  }
  products.deleteProduct(product.id)
    .then(response => {
      // TODO Show notification
      products.getProducts()
    })
}

</script>

<template>
  <div
    class="bg-white p-4 rounded-lg shadow flex flex-col items-center sm:min-h-[600px] min-h-screen sm:mx-2"
  >
    <div class="flex justify-between border-b-2 pb-3 w-full">
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
    <table class="table-auto w-full">
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
          <TableHeaderCell field="actions"> Actions </TableHeaderCell>
        </tr>
      </thead>
      <tbody v-if="products.loading" >
        <tr class="w-full h-[350px]">
          <td colspan="6">
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
        <tr v-for="(product) of products.data" :key="product.id" class='align-center animate-fade-in-down'>
          <!-- :style='{ "animation-delay": `${ index * 0.02 }s` }' -->
          <td class="border-b">{{ product.id }}</td>
          <td class="border-b">
            <img class="w-16 h-12" :src="product.image_url" :alt="product.title" />
          </td>
          <td
            class="border-b max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis"
          >
            {{ product.title }}
          </td>
          <td class="border-b">{{ product.price }}</td>
          <td class="border-b">{{ product.updated_at }}</td>
          <td class="border-b">
            <Menu as="div" class="relative inline-block pl-4">
              <div>
                <MenuButton
                  class="p-1 inline-flex items-center justify-center w-full rounded-full bg-black bg-opacity-0 text-sm hover:bg-black/10 focus:outline-indigo-600"
                >
                  <EllipsisVerticalIcon
                    class="h-5 w-5 text-indigo-500"
                    aria-hidden="true"
                  />
                </MenuButton>
              </div>
              <Transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <MenuItems
                  class="absolute z-10 right-0 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1"
                >
                  <div class="p-1">
                    <MenuItem v-slot="{ active }">
                      <button
                        :class="[
                          active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                          'group flex w-full items-center rounded-md p-2 text-sm'
                        ]"
                        @click='editProduct(product)'
                      >
                        <PencilIcon
                          :active="active"
                          class="mr-2 h-5 w-5 text-indigo-400"
                          aria-hidden="true"
                        />
                        Edit
                      </button>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                      <button
                        :class="[
                          active ? 'bg-rose-600 text-white' : 'text-gray-900',
                          'group flex w-full items-center rounded-md p-2 text-sm'
                        ]"
                        @click="deleteProduct(product)"
                      >
                        <TrashIcon
                          :active="active"
                          class="mr-2 h-5 w-5 text-rose-400"
                          aria-hidden="true"
                        />
                        Delete
                      </button>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Transition>
            </Menu>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      v-if="!products.loading"
      class="flex justify-between items-center gap-2 pt-2 mt-auto"
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
          class="relative inline-flex items-center px-4 py-2 border text-sm font-medium whitespace-nowrap focus:outline-indigo-600"
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
<style scoped>
</style>
