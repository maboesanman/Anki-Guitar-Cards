<script setup lang="ts">
import { computed, onMounted } from 'vue';

type FretMark = number | 'open' | 'muted'
type Mark = [number, FretMark, string] | [number, FretMark]

const props = defineProps<{
  type: 'absolute' | 'relative'
  marks: Mark[]
}>()

const computedMarks = computed(() => {
  return props.marks.map(m => {
    let [string, fret, label] = m;
    let gridColumn: number;
    let muted = false;
    if(fret === "open") {
      gridColumn = 0;
    } else if(fret === "muted") {
      gridColumn = 0;
      muted = true;
    } else {
      gridColumn = fret + 1
    }

    return {
      gridColumn,
      gridRow: 7 - string,
      label,
      muted,
    }
  })
})

onMounted(() => {
  console.log(computedMarks.value)
})

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
      <div class="fret" :style="`grid-column: ${i} / ${i}`" />
    </template>

    <!-- strings -->
    <template v-for="i in 6" :key="i">
      <div class="string" :style="`grid-row: ${i} / ${i}`" />
    </template>

    <!-- marks -->
    <template v-for="mark, index in computedMarks" :key="index">
      <div class="mark" :style="`grid-area: ${mark.gridRow} / ${mark.gridColumn}`" >
        {{ mark.label }}  
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
@use 'sass:math';

$fret-ratio: 0.9438743126816934;

@function fret-width($fret) {
  @return (math.pow($fret-ratio, $fret - 1) - math.pow($fret-ratio, $fret)) * 2fr;
}

@function fret-grid-cols() {
  $result: 2em;
  @for $f from 1 through 12 {
    $result: $result fret-width($f)
  }
  @return $result;
}

@function fret-grid-rows() {
  $result: 1fr;
  @for $f from 2 through 6 {
    $result: $result 1fr
  }
  @return $result;
}

.fretboard {
  display: grid;
  grid-template-columns: fret-grid-cols();
  grid-template-rows: fret-grid-rows();
  width: 100%;
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
  height: 83.333333333%;

  place-self: center stretch;
  border-right: 1px solid black;
}

.string {
  grid-column: 2 / 13;

  height: 1px;
  place-self: center stretch;
  background-color: black;
}

.mark {
  place-self: center center;
  height: 1.5em;
  width: 1.5em;
  background-color: black;
  color: white;
  text-align: center;
  line-height: 1.5em;
  border-radius: 50%;
}
</style>
