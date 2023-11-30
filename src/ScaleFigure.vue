<script setup lang="ts">
import type { Mark } from './Mark';

defineProps<{
  marks: Mark[]
}>()

</script>

<template>
  <div class="container">
    <div class="fretboard">
      <!-- frets -->
      <template v-for="i in 6" :key="i">
        <div class="fret" :style="`grid-column: ${i} / ${i}`" />
      </template>
  
      <!-- strings -->
      <template v-for="i in 6" :key="i">
        <div class="string" :style="`grid-row: ${i} / ${i}`" />
      </template>
  
      <!-- marks -->
      <template v-for="mark, index in marks" :key="index">
        <div v-if="mark.type === 'single'"
          class="mark mark--single"
          :style="
            `grid-area: ${7 - mark.string} / ${mark.fret + 1};
            ${mark.color ? 'background-color: ' + mark.color + ';': ''}
          `">
          {{ mark.label }}
        </div>
        <div v-if="mark.type === 'barre'"
          class="mark mark--barre"
          :style="`
            grid-area: ${7 - mark.endString} / ${mark.fret + 1} / ${8 - mark.startString};
            height: ${1.5 + 2 * (mark.endString - mark.startString)}em;
            line-height: ${1.5 + 2 * (mark.endString - mark.startString)}em;
            ${mark.color ? 'background-color: ' + mark.color + ';': ''}
          `">
          {{ mark.label }}
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/functions';
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.fretboard {
  flex: 1;
  background-color: white;
  color: black;
  display: grid;
  grid-template-columns: 1px functions.fret-grid-frets-inner(5);
  grid-template-rows: functions.fret-grid-strings(6);
  margin: 0 1em;
  max-width: 24em;
}

.fret-mark {
  grid-row: 1 / 7;
  place-self: center center;
  width: .8em;
  height: .8em;
  background-color: lightgrey;
  border-radius: 50%;

  &.top {
    grid-row: 1 / 5;
  }

  &.bottom {
    grid-row: 3 / 7;
  }
}

.fret {
  grid-row: 1 / 7;
  height: calc(83.333333333% + 1px);

  place-self: center stretch;
  border-right: 1px solid black;
}

.string {
  grid-column: 2 / 7;

  height: 1px;
  place-self: center stretch;
  background-color: black;
}

.mark {
  place-self: center center;
  text-align: center;
  width: 1.5em;
  border-radius: 40000px;
  line-height: 1.5em;
  height: 1.5em;

  &--single, &--barre {
    background-color: black;
    color: white;
  }

  &--muted, &--open {
    grid-column: 1;
  }
}
</style>
