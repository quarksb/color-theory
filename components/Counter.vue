<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  count: {
    default: 5,
  },
  label: {
    default: '帅气值'
  }
})

const counter = ref(props.count);
const label = ref(props.label)

</script>

<template>
  <div flex="~" w="min" border="~ gray-400 opacity-50 rounded-md">
    <div
      border="r gray-400 opacity-50"
      outline="!none"
      w="min-20"
      m="auto"
    >
    {{label}}
    </div>
    <input border="r gray-400 opacity-50" type="range" id="tickmarks" p="auto" :min="0" :max="10" :value="counter" step="1"  />
    <button
      border="l r gray-400 opacity-50"
      p="1"
      font="mono"
      outline="!none"
      hover:bg="gray-400 opacity-20"
      @click="counter -= 1"
    >
      -
    </button>
    <span m="auto" p="1">{{ counter }}</span>
    
    <button
      border="l gray-400 opacity-50"
      p="1"
      font="mono"
      outline="!none"
      hover:bg="gray-400 opacity-20"
      @click="counter += 1"
    >
      +
    </button>
  </div>
</template>
