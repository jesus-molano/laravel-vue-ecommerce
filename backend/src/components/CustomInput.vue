<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number, File]
  },
  label: {
    type: String
  },
  type: {
    type: String,
    default: 'text'
  },
  name: {
    type: String
  },
  required: {
    type: Boolean
  },
  prepend: {
    type: String,
    default: ''
  },
  append: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const inputClasses = computed(() => {
  const cls = [
    'block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm resize-none'
  ]
  if (props.append && !props.prepend) {
    cls.push('rounded-l-md')
  } else if (props.prepend && !props.append) {
    cls.push('rounded-r-md')
  } else if (!props.append && !props.prepend) {
    cls.push('rounded-md')
  }
  return cls.join(' ')
})
</script>

<template>
  <div>
    <label for="" class="sr-only">{{ label }}</label>
    <div class="mt-1 flex rounded-md shadow-sm">
      <span
        v-if="prepend"
        class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
      >
        {{ prepend }}
      </span>
      <template v-if="type === 'textarea'">
        <textarea
          :name="name"
          :required="required"
          :value="props.modelValue"
          @input="emit('update:modelValue', $event.target.value)"
          :class="inputClasses"
          :placeholder="label"
        ></textarea>
      </template>
      <template v-else-if="type === 'file'">
        <input
          :type="type"
          :name="name"
          :required="required"
          :value="props.modelValue"
          @input="emit('change', $event.target.files[0])"
          :class="inputClasses"
          :placeholder="label"
        />
      </template>
      <template v-else>
        <input
          :type="type"
          :name="name"
          :required="required"
          :value="props.modelValue"
          @input="emit('update:modelValue', $event.target.value)"
          :class="inputClasses"
          :placeholder="label"
          step="0.01"
        />
      </template>
      <span
        v-if='append'
        class='inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-500 text-sm'
      >
        {{ append }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
