<script setup>
import { useStore } from '../stores/store'
import useDragAndDrop from '../composables/useDnD'
import { reactive } from 'vue'

const graphStore = useStore()

const { onDragStart } = useDragAndDrop()
const nodesType = reactive({
  start: {
    name: 'Start Node',
    type: 'input'
  },
  state: {
    name: 'State Node'
  },
  sms: {
    name: 'Send SMS Node',
    type: 'output'
  }
})

const selectNode = (type) => {
  const node = {
    id: `node-${type}-${Date.now()}`,
    type,
    position: { x: 100, y: 100 },
    data: { label: type.charAt(0).toUpperCase() + type.slice(1) }
  }
  graphStore.addElement(node)
}
</script>

<template>
  <aside>
    <div class="description">You can drag these nodes to the pane.</div>

    <div class="nodes" v-for="(node, key) in nodesType" :key="key">
      <div
        class="vue-flow__node-input"
        :draggable="true"
        @dragstart="onDragStart($event, node.name, node.type)"
        @dblclick="selectNode(key)">
        {{ node.name }}
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
