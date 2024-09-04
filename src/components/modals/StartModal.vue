<script setup>
import CustomSelect from '../formItems/CustomSelect.vue'
import { ref, watch } from 'vue'
import { useStore } from '@/stores/store.js'

const props = defineProps(['node'])

const graphStore = useStore()

const selectedValue = ref(props.node.data.audience || null)

const options = [
  { label: 'Users with no purchase', value: 1 },
  { label: 'Subscribed users', value: 2 },
  { label: 'Regular users', value: 3 }
]

watch(selectedValue, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    const nodeData = { id: props.node.id, data: { audience: newValue } }
    graphStore.updateNodeInternalStructure(nodeData)
  }
})
</script>

<template>
  <h3 class="modal-title">Choose Audience</h3>
  <CustomSelect v-model="selectedValue" :options="options" />
</template>

<style lang="scss"></style>
