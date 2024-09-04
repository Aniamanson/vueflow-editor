<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  options: {
    type: Array,
    required: true
  },
  modelValue: {
    type: [String, Number],
    default: null
  }
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const selectedValue = ref(props.modelValue)

const selectedLabel = computed(() => {
  const selectedOption = props.options.find((option) => option.value === selectedValue.value)
  return selectedOption ? selectedOption.label : 'Select an option'
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectOption = (option) => {
  selectedValue.value = option.value
  emit('update:modelValue', option.value)
  toggleDropdown()
}
</script>

<template>
  <div class="custom-select" @click.stop="toggleDropdown">
    <div class="selected-item">{{ selectedLabel }}</div>
    <div v-if="isOpen" class="dropdown">
      <div
        v-for="option in options"
        :key="option.value"
        :class="{ active: option.value === selectedValue }"
        class="dropdown-item"
        @click.stop="selectOption(option)">
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.custom-select {
  position: relative;
  cursor: pointer;
}
.selected-item {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.dropdown {
  position: relative;
  top: 100%;
  left: 0;
  right: 0;
  border: 1px solid #ccc;
  border-top: none;
  background: transparent;
  z-index: 1000;
  max-height: 180px;
  overflow: scroll;

  &-item {
    padding: 10px;

    &:hover {
      background: #f0f0f0;
    }
    &.active {
      background: rgba(114, 244, 255, 0.75);
    }
  }
}
.dark .dropdown-item {
  &:hover {
    background: #2c2a43;
    opacity: 0.7;
  }
  &.active {
    background: #2c2a43;
    &:hover {
      background: #2c2a43;
      opacity: 1;
    }
  }
}

@media screen and (max-width: 800px) {
  .custom-select {
    font-size: 12px;
  }

  .selected-item,
  .dropdown-item {
    padding: 5px;
  }
}
</style>
