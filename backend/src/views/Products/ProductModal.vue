<script setup>
import { computed, onUpdated, ref } from 'vue'
import { useProductsStore } from '@/stores'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle
} from '@headlessui/vue'
import { LoadingSpinner, CustomInput } from '@/components'

const props = defineProps({
  modelValue: {
    type: Boolean
  },
  product: {
    type: Object,
    required: true
  }
})

const emits = defineEmits(['update:modelValue', 'close'])

const loading = ref(false)
const product = ref({ ...props.product })
const products = useProductsStore()

onUpdated(() => {
  product.value = {
    ...props.product
  }
})

const show = computed({
  get: () => props.modelValue,
  set: value => emits('update:modelValue', value)
})

function closeModal () {
  show.value = false
  emits('close')
}

function onSubmit () {
  loading.value = true
  if (product.value.id) {
    products.updateProduct(product.value).then(response => {
      loading.value = false
      if (response.status === 200) {
        // TODO show notification
        products.getProducts()
        closeModal()
      }
    })
  } else {
    products.createProduct(product.value).then(response => {
      loading.value = false
      if (response.status === 201) {
        // TODO show notification
        products.getProducts()
        closeModal()
      }
    })
  }
}
</script>

<template>
  <TransitionRoot appear :show="show" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-75" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="flex flex-col justify-center min-h-[350px] w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <LoadingSpinner
                v-if="loading"
                class="self-center"
                width="10"
                height="10"
                dark-color="text-indigo-700"
              />
              <header
                v-if="!loading"
                class="py-3 px-4 flex justify-between items-center"
              >
                <DialogTitle
                  as="h3"
                  class="text-lg leading-6 font-medium text-gray-900"
                >
                  {{
                    product.id
                      ? `Update product: "${props.product.title}"`
                      : 'Create new Product'
                  }}
                </DialogTitle>
                <button
                  @click="closeModal"
                  class="w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer hover:bg-black/20]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </header>
              <form v-if="!loading" @submit.prevent="onSubmit">
                <div class="bg-white px-4 pt-5 pb-4">
                  <CustomInput
                    class="mb-2"
                    v-model="product.title"
                    label="Product Title"
                  />
                  <CustomInput
                    type="file"
                    class="mb-2"
                    @change="file => (product.image = file)"
                    label="Product Image"
                  />
                  <CustomInput
                    type="textarea"
                    class="mb-2"
                    v-model="product.description"
                    label="Description"
                  />
                  <CustomInput
                    type="number"
                    class="mb-2"
                    v-model="product.price"
                    label="Price"
                    prepend="$"
                  />
                </div>
                <footer
                  class="bg-gray-50 px-4 py-3 sm:px-6 flex flex-col sm:flex-row-reverse gap-2"
                >
                  <button
                    type="submit"
                    class=" w-full py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    class=" w-full py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-rose-600 hover:bg-rose-500"
                    @click="closeModal"
                    ref="cancelButtonRef"
                  >
                    Cancel
                  </button>
                </footer>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style lang="scss" scoped></style>
