import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStore = defineStore('graphs', () => {
  const nodes = ref([])
  const edges = ref([])
  const dark = ref(false)

  const reset = () => {
    edges.value = []
    nodes.value = []
  }

  const log = () => {
    console.log('nodes', nodes.value, 'edges', edges.value)
  }

  const toggleClass = () => {
    dark.value = !dark.value

    if (localStorage.getItem('theme')) {
      localStorage.removeItem('theme')
    }
    localStorage.setItem('theme', dark.value.toString())
  }

  const loadTheme = () => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      dark.value = savedTheme === 'true'
    }
  }

  const saveGraph = () => {
    const graphData = {
      nodes: nodes.value,
      edges: edges.value
    }
    if (localStorage.getItem('vueflow-graph')) {
      localStorage.removeItem('vueflow-graph')
    }
    localStorage.setItem('vueflow-graph', JSON.stringify(graphData))
  }

  const loadGraph = () => {
    const savedGraph = localStorage.getItem('vueflow-graph')
    if (savedGraph) {
      const graphData = JSON.parse(savedGraph)
      nodes.value = graphData.nodes
      edges.value = graphData.edges
    }
  }

  return {
    nodes,
    edges,
    dark,
    reset,
    log,
    toggleClass,
    loadTheme,
    saveGraph,
    loadGraph
  }
})
