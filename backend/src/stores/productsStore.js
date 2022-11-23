import { ref } from 'vue'
import { defineStore } from 'pinia'
import axiosClient from '../axios'

export const useProductsStore = defineStore('products', () => {
  // State
  const loading = ref(false)
  const data = ref([])
  const links = ref([])
  const from = ref(null)
  const to = ref(null)
  const page = ref(1)
  const limit = ref(null)
  const total = ref(null)

  // Actions
  async function getProducts (
    url = null,
    search = '',
    perPage = 10,
    sortField,
    sortDirection
  ) {
    loading.value = true
    url = url || '/products'
    try {
      const res = await axiosClient.get(url, {
        params: {
          search,
          per_page: perPage,
          sort_field: sortField,
          sort_direction: sortDirection
        }
      })
      loading.value = false
      data.value = res.data.data
      links.value = res.data.meta.links
      from.value = res.data.meta.from
      to.value = res.data.meta.to
      page.value = res.data.meta.current_page
      limit.value = res.data.meta.per_page
      total.value = res.data.meta.total
    } catch {
      loading.value = false
    }
  }

  function createProduct (product) {
    if (product.image instanceof File) {
      const form = new FormData()
      form.append('title', product.title)
      form.append('image', product.image)
      form.append('description', product.description)
      form.append('price', product.price)
      product = form
    }
    return axiosClient.post('/products', product)
  }

  function updateProduct (product) {
    const id = product.id
    if (product.image instanceof File) {
      const form = new FormData()
      form.append('id', product.id)
      form.append('title', product.title)
      form.append('image', product.image)
      form.append('description', product.description)
      form.append('price', product.price)
      form.append('_method', 'PUT')
      product = form
    } else {
      product._method = 'PUT'
    }
    return axiosClient.post(`/products/${id}`, product)
  }

  return {
    loading,
    data,
    links,
    from,
    to,
    page,
    limit,
    total,
    getProducts,
    createProduct,
    updateProduct
  }
})
