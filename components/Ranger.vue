<template>
    <div class="grid">
        <div class="label">
            <span>{{ label }}</span>
        </div>
        <Slider
            :value="model"
            class="slider"
            :min="min"
            :max="max"
            :start="start"
            :step="realStep"
            @change="changeHandler"
        />
        <input
            type="number"
            class="number"
            style="outline: none"
            :value="model"
            :min="min"
            :max="max"
            :step="step"
            @change="changeHandler"
        />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { Slider } from "ant-design-vue";
import 'ant-design-vue/es/slider/style/css';

export default defineComponent({
    name: "Ranger",
    components: {
        Slider,
    },
    props: {
        model: {
            type: Number,
            required: true,
        },
        label: {
            type: String,
            default: "sb",
        },
        min: {
            type: Number,
            default: 0,
        },
        max: {
            type: Number,
            default: 100,
        },
        start: {
            type: Number,
            default: 0,
        },
        step: {
            type: Number,
            default: 1,
        },
    },
    emits: ["changeData"],
    data(props) {
        const realStep = props.step ?? (props.max - props.min) / 100;
        // 这样不具有响应性
        const value = computed(() => props.model);
        return {
            realStep,
            value,
        };
    },
    methods: {
        changeHandler(val: Number | Event) {
            let value;
            if (typeof val === "number") {
                value = val;
            } else {
                value = ((val as Event).target! as HTMLInputElement).value;
            }
            this.$emit("changeData", Number(value));
        },
    },
});
</script>

<style lang="less" scoped>
.grid {
    display: grid;
    width: 100%;
    grid-template-columns: 49px auto 36px;
    grid-column-gap: 5px;
    border-radius: 4px;
    padding: 0 10px;
    color: #636c78;
    .label {
        display: grid;
        text-align: left;
        line-height: 30px;
        justify-self: start;
        align-self: center;
    }
    .slider {
        border-radius: 4px;
        place-self: center;
        width: 100%;
        .ant-input-number {
            width: 100%;
            border-radius: 4px;
            .ant-input-number-input {
                padding: 0;
            }
        }
    }
    .number {
        border: none;
        text-align: center;
        background: none;
    }
    .number:active {
        border: none;
        outline: none;
    }
}
input[type="number"] {
    -moz-appearance: textfield;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>
