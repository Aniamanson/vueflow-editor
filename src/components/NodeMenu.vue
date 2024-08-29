<script setup>
import useDragAndDrop from '../composables/useDnD'
import { reactive } from 'vue'

const emit = defineEmits(['addNode'])

const { onDragStart } = useDragAndDrop()
const nodesType = reactive({
  start: 'Start Node',
  state: 'State Node',
  sms: 'Send SMS Node'
})

const selectNode = (type) => {
  const node = {
    id: `node-${type}-${Date.now()}`,
    type,
    position: { x: 100, y: 100 },
    data: { label: type.charAt(0).toUpperCase() + type.slice(1) }
  }
  emit('addNode', node)
}
</script>

<template>
  <aside>
    <div class="description">You can drag these nodes to the pane.</div>

    <div class="nodes" v-for="(node, key) in nodesType" :key="key">
      <div
        class="vue-flow__node-input"
        :draggable="true"
        @dragstart="onDragStart($event, node, key)"
        @dblclick="selectNode(key)">
        {{ node }}
      </div>
    </div>
  </aside>
</template>

<style>
.node-menu {
  width: 200px;
  padding: 10px;
  background-color: #f7f7f7;
}
</style>
