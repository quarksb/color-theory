<template>
  <div class="relative">
    <!-- <canvas ref="bottomCanvas" :style="{transform: `scale(${scale})`}"></canvas> -->
    <canvas ref="canvas" class="absolute top-0" :style="{transform: `scale(${scale})`}"></canvas>
    <div class="absolute w-1/4 right-5 top-1/2">
      <!-- <input type="color" :value="color" @input="changeColor"> -->
      <Ranger :label="'粒度'" :min="1" :max="20" :model="lineGap" @changeData="changeVal($event, 'lineGap')"/>
      <Ranger :label="'缩放'" :min="0.2" :max="2" :step="0.01" :model="scale" @changeData="changeVal($event, 'scale')"/>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import chroma from 'chroma-js';
// import { Row, Col, Slider, InputNumber } from 'ant-design-vue';
import { loadImage, wait } from '../utils';
import Ranger from './Ranger.vue';
// import 'ant-design-vue/es/row/style/css';
// import 'ant-design-vue/es/col/style/css';
// import 'ant-design-vue/es/slider/style/css';
// import 'ant-design-vue/es/input-number/style/css';

const width = 800;
const height = 800;
export default defineComponent({
    name: "MainComponent",
    components:{ Ranger },
    data(){
      return {
        lineGap: 8,
        linePercent: 50,
        color: '#ff0000',
        scale: 0.8,
      }
    },
    async mounted() {
        this.canvas = <HTMLCanvasElement>this.$refs.canvas;
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.font = '70px serif';
        // this.canvas.style.transform = `scale(${this.scale})`;
        // this.canvas.style.transform = `scale(${this.scale})`;
       
        const url = "https://gd-filems.dancf.com/mcm79j/mcm79j/17215/b3db72af-969f-4992-b391-c873d5995d1d1082759.png";
        this.image = await loadImage(url);
        this.render();
    },
    watch:{
      'lineGap'(){
        this.render();
      },
      'linePercent'(){
        this.render();
      },
    },
    methods: {
        changeVal(val, propName){
          if(typeof val === 'number'){
            this[propName] = val;
            this.render();
          }
        },
        changeColor(event){
          if(event.target.value){
            this.color = event.target.value;
            this.render();
          }
        },
        async render(){
          let currentPos = this.lineGap/2;
          const [h,s,v] = chroma(this.color).hsv();
          const angle = 10;
          let bacColor = chroma.hsv((h + 180 - angle)%360, s, v).css();
          let auxiliaryColor = chroma.hsv((h + 180 + angle)%360, s, v).css();
          let padding = 40;

          const basicCanvas =(()=>{
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = this.lineGap;
            return canvas;
          })();
          const ctx = basicCanvas.getContext('2d');
          
          
          const sh = this.lineGap * this.linePercent * 0.01;
          
          

          
          this.ctx.fillStyle = bacColor;
          this.ctx.fillRect(0,0,width,height);
          this.ctx.fillStyle = '#000';

          const paint = (rect:Array<number>, pattern)=>{
            this.ctx.save();
            this.ctx.translate(rect[0], rect[1]);
            this.ctx.fillStyle = pattern;
            this.ctx.fillRect(0,0,rect[2],rect[3]);
            this.ctx.restore();
          }

          ctx.fillStyle = '#000';
          ctx.fillRect(0,0,width,this.lineGap - sh);
          const smallRect = [width/3, height/4, width/3, height/2];
          const rightRect = [width*2/3, height/4,width/3,height/2];
          
          const rect = [0, 0, width, height];
          paint(smallRect, '#000');

          ctx.fillStyle = auxiliaryColor;
          ctx.fillRect(0,0,width,this.lineGap - sh);
          let pattern = this.ctx.createPattern(basicCanvas, 'repeat-y');
          paint(rect, pattern);

          // 画面中部渐变
          let gradient = this.ctx.createLinearGradient(0, 0, smallRect[2], 0);
          gradient.addColorStop(0.3, 'rgba(0,0,0,0)');
          gradient.addColorStop(0.7, 'rgba(255,255,255,1)');
          ctx.fillStyle = gradient;
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
          ctx.fillRect(0, 0, width, this.lineGap - sh);

          pattern = this.ctx.createPattern(basicCanvas, 'repeat-y');
          paint(smallRect, pattern);

          // 画面右边渐变
          gradient = this.ctx.createLinearGradient(0, 0, smallRect[2], 0);
          gradient.addColorStop(0.3, 'rgba(0,0,0,1)');
          gradient.addColorStop(0.7, 'rgba(0,0,0,0)');
          ctx.fillStyle = gradient;
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
          ctx.fillRect(0, this.lineGap - sh, width, sh);

          pattern = this.ctx.createPattern(basicCanvas, 'repeat-y');
          paint(rightRect, pattern);
        }
    },
});
</script>
