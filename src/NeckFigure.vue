<script setup lang="ts">
import { computed, onMounted } from 'vue';
import type { Mark } from './Mark';

const props = defineProps<{
  marks: Mark[]
}>()

</script>

<template>
  <div class="fretboard">

    <!-- fret marks -->
    <div class="fret-mark" style="grid-column: 4 / 4"/>
    <div class="fret-mark" style="grid-column: 6 / 6"/>
    <div class="fret-mark" style="grid-column: 8 / 8"/>
    <div class="fret-mark" style="grid-column: 10 / 10"/>
    <div class="fret-mark top" style="grid-column: 13 / 13"/>
    <div class="fret-mark bottom" style="grid-column: 13 / 13"/>

    <!-- frets -->
    <template v-for="i in 12" :key="i">
      <div class="fret" :class="{'fret--nut': i === 1 }" :style="`grid-column: ${i} / ${i}`" />
    </template>

    <!-- strings -->
    <template v-for="i in 6" :key="i">
      <div class="string" :style="`grid-row: ${i} / ${i}`" />
    </template>

    <!-- marks -->
    <template v-for="mark, index in marks" :key="index">
      <div v-if="mark.type === 'single'"
        class="mark mark--single"
        :style="`grid-area: ${7 - mark.string} / ${mark.fret + 1}`">
        {{ mark.label }}
      </div>
      <div v-if="mark.type === 'barre'"
        class="mark mark--barre"
        :style="`
          grid-area: ${7 - mark.endString} / ${mark.fret + 1} / ${8 - mark.startString};
          height: ${1.5 + 2 * (mark.endString - mark.startString)}em;
          line-height: ${1.5 + 2 * (mark.endString - mark.startString)}em;
        `">
        {{ mark.label }}
      </div>
      <div v-if="mark.type === 'muted'"
        class="mark mark--muted"
        :style="`grid-row: ${7 - mark.string}`">
        ╳
      </div>
      <div v-if="mark.type === 'open'"
        class="mark mark--open"
        :style="`grid-row: ${7 - mark.string}`">
        ⵔ
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
@use 'sass:math';

// (1/2)^(1/12), for equal temperament
$fret-ratio: 0.9438743126816934;

@function fret-width($fret) {
  @return (math.pow($fret-ratio, $fret - 1) - math.pow($fret-ratio, $fret)) * 2fr;
}

@function fret-grid-cols() {
  $result: calc(2em + 4px);
  @for $f from 1 through 12 {
    $result: $result fret-width($f)
  }
  @return $result;
}

@function fret-grid-rows() {
  $result: 2em;
  @for $f from 2 through 6 {
    $result: $result 2em
  }
  @return $result;
}

.fretboard {
  display: grid;
  grid-template-columns: fret-grid-cols();
  grid-template-rows: fret-grid-rows();
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

  &--nut {
    border-right-width: 4px;
  }
}

.string {
  grid-column: 2 / 13;

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
