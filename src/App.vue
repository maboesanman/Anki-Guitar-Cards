<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { parseConfig } from './Mark';
import NeckFigure from './NeckFigure.vue'

const props = defineProps<{
  config: string
}>()

const markConfig = computed(() => parseConfig(props.config))

onMounted(() => {
  console.log(markConfig.value)
})

</script>

<template>
  <neck-figure :marks="markConfig?.marks ?? []" />
</template>

<style scoped lang="scss">
</style>
