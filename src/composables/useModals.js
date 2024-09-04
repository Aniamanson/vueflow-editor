import { ref, shallowRef } from 'vue'
import StartModal from '../components/modals/StartModal.vue'
import SendSmsModal from '../components/modals/SendSmsModal.vue'

const show = ref(false)
const component = shallowRef()
const modalOpen = ref(false)

export function useModal() {
  return {
    show,
    component,
    modalOpen,
    showModal: (type) => {
      show.value = true

      switch (type) {
        case 'input':
          return (component.value = StartModal)
        case 'output':
          return (component.value = SendSmsModal)
      }
    },
    hideModal: () => {
      show.value = false
      modalOpen.value = false
    }
  }
}
