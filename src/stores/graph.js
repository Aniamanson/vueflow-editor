import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGraphStore = defineStore('graph', () => {
  const elements = ref([])
  const dark = ref(false)

  const addElement = (element) => {
    elements.value.push(element)
  }

  const updateElement = (updatedElement) => {
    const index = elements.value.findIndex((el) => el.id === updatedElement.id)
    if (index !== -1) {
      elements.value[index] = updatedElement
    }
  }

  const removeElement = (elementId) => {
    elements.value = elements.value.filter((el) => el.id !== elementId)
  }

  const saveGraph = () => {
    const graphData = {
      elements: elements.value
    }
    localStorage.setItem('vueflow-graph', JSON.stringify(graphData))
  }

  const loadGraph = () => {
    const savedGraph = localStorage.getItem('vueflow-graph')
    if (savedGraph) {
      elements.value = JSON.parse(savedGraph).elements
    }
  }

  return {
    elements,
    dark,
    addElement,
    updateElement,
    removeElement,
    saveGraph,
    loadGraph
  }
})
