<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { parseConfig } from './Mark';
import NeckFigure from './NeckFigure.vue';
import ChordFigure from './ChordFigure.vue';
import ScaleFigure from './ScaleFigure.vue';

const props = defineProps<{
  config: string;
  hideLabels: boolean;
}>()

const markConfig = computed(() => parseConfig(props.config, props.hideLabels))

onMounted(() => {
  console.log(markConfig.value)
})

</script>

<template>
  <neck-figure v-if="markConfig?.type === 'neck'" :marks="markConfig.marks" />
  <scale-figure v-else-if="markConfig?.type === 'scale'" :marks="markConfig.marks" />
  <chord-figure v-else-if="markConfig?.type === 'chord'" :marks="markConfig.marks" :nut="markConfig.nut"/>
  <div v-else>parsing error</div>
</template>

<style scoped lang="scss">
</style>
