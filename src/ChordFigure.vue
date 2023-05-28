<script setup lang="ts">
import type { Mark } from './Mark';

defineProps<{
  marks: Mark[];
  nut: boolean;
}>()

</script>

<template>
  <div class="fretboard">
    <!-- frets -->
    <template v-for="i in 6" :key="i">
      <div class="fret" :class="{'fret--nut': i === 1 && nut }" :style="`grid-row: ${i}`" />
    </template>

    <!-- strings -->
    <template v-for="i in 6" :key="i">
      <div class="string" :style="`grid-column: ${i}`" />
    </template>

    <!-- marks -->
    <template v-for="mark, index in marks" :key="index">
      <div v-if="mark.type === 'single'"
        class="mark mark--single"
        :style="`
          grid-area: ${mark.fret + 1} / ${mark.string};
          ${mark.color ? 'background-color: ' + mark.color + ';': ''}
        `">
        {{ mark.label }}
      </div>
      <div v-if="mark.type === 'barre'"
        class="mark mark--barre"
        :style="`
          grid-area: ${mark.fret + 1} / ${mark.endString + 1} / ${mark.fret + 1} / ${mark.startString};
          width: ${1.5 + 2 * (mark.endString - mark.startString)}em;
          ${mark.color ? 'background-color: ' + mark.color + ';': ''}
        `">
        {{ mark.label }}
      </div>
      <div v-if="mark.type === 'muted'"
        class="mark mark--muted"
        :style="`grid-column: ${mark.string}`">
        ╳
      </div>
      <div v-if="mark.type === 'open'"
        class="mark mark--open"
        :style="`grid-column: ${mark.string}`">
        ⵔ
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
@use '@/functions';

.fretboard {
  display: grid;
  grid-template-columns: functions.fret-grid-strings(6);
  grid-template-rows: functions.fret-grid-frets(5);
  height: 300px;
  margin-bottom: 1em;
}

.fret {
  grid-column: 1 / 7;
  width: calc(83.333333333% + 1px);

  place-self: stretch center;
  border-bottom: 1px solid black;

  &--nut {
    border-bottom-width: 4px;
  }
}

.string {
  grid-row: 2 / 7;

  width: 1px;
  place-self: stretch center;
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
    grid-row: 1;
  }
}
</style>
