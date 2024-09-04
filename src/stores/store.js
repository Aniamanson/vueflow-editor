import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useVueFlow } from '@vue-flow/core'
const { updateNodeInternals, setNodes, setEdges } = useVueFlow()

export const useStore = defineStore('graphs', () => {
  const nodes = ref([])
  const edges = ref([])
  const dark = ref(false)

  const reset = () => {
    edges.value = []
    nodes.value = []
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

  const updateNodeInternalStructure = (nodeData) => {
    const node = nodes.value.find((node) => node.id === nodeData.id)
    if (node) {
      node.data = {
        ...node.data,
        ...nodeData.data
      }

      // Update the nodes in the state
      setNodes([...nodes.value])
    }

    // edges.value = edges.value.filter((edge) => edge.source !== nodeData.id)

    updateNodeInternals(nodeData.id)
  }

  const updateEdges = (nodeId, newValue) => {
    let updatedEdge = null
    if (newValue !== null) {
      updatedEdge = edges.value.map((edge) => {
        if (edge.source === nodeId) {
          return { ...edge, sourceHandle: `${nodeId}_source` }
        }
        return edge
      })
    } else {
      updatedEdge = edges.value.filter((edge) => edge.source !== nodeId)
    }

    edges.value = updatedEdge
    setEdges(updatedEdge)
  }

  const saveJsonGraph = (print) => {
    const graphData = {
      name: 'new flow', // Здесь можно установить нужное имя
      main: {
        data: {}
      }
    }

    // Преобразуем узлы в нужный формат
    nodes.value.forEach((node) => {
      graphData.main.data[node.id] = {
        id: node.id,
        name: node.name,
        data: node.data,
        class: node.class,
        html: node.html || '',
        typenode: node.typenode || false,
        inputs: {},
        outputs: {},
        pos_x: node.position?.x || 0,
        pos_y: node.position?.y || 0
      }
    })

    // Преобразуем связи (edges) в нужный формат
    edges.value.forEach((edge) => {
      const { source, sourceHandle, target, targetHandle } = edge
      if (graphData.main.data[source]) {
        graphData.main.data[source].outputs[sourceHandle] = {
          connections: [
            {
              node: target,
              output: targetHandle
            }
          ]
        }
      }
      if (graphData.main.data[target]) {
        graphData.main.data[target].inputs[targetHandle] = {
          connections: [
            {
              node: source,
              input: sourceHandle
            }
          ]
        }
      }
    })

    // Вывод данных
    if (print) {
      console.log('graphData ', graphData)
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
    saveJsonGraph()
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
    toggleClass,
    updateNodeInternalStructure,
    updateEdges,
    saveJsonGraph,
    loadTheme,
    saveGraph,
    loadGraph
  }
})
