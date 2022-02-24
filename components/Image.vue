<template>
  <div class="relative">
    <img 
      class="origin-top-left"
      src="https://gd-filems.dancf.com/mcm79j/mcm79j/08978/c9ba1d1e-8ec5-4a9e-b0e7-ba4f941886fd10648891.png" 
      :style="{transform: `scale(${scale})`, filter:`hue-rotate(${hueRotate}deg)`}"
    />
    <div class="absolute w-1/4 right-5 top-0">
      <Ranger :label="'色相'" :min="0" :max="360" :model="hueRotate" @changeData="changeVal($event, 'hueRotate')"/>
      <Ranger :label="'缩放'" :min="0.2" :max="2" :step="0.01" :model="scale" @changeData="changeVal($event, 'scale')"/>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import chroma from 'chroma-js';
import { loadImage, wait } from '../utils';
import Ranger from './Ranger.vue';

const width = 800;
const height = 450;
export default defineComponent({
    name: "MainComponent",
    components:{ Ranger },
    data(){
      return {
        hueRotate: 6,
        scale: 0.5,
      }
    },
    methods: {
        changeVal(val, propName){
          if(typeof val === 'number'){
            this[propName] = val;
          }
        },
    }
});
</script>
