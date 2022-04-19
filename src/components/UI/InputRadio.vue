<template>
<div class="form__elem-radio">
    <div class="form__radio-title">{{ placeholder }}</div>
    <div class="form__radio-item" v-for="(option) in options" :key="option.id">
        <input type="radio" 
            :name="name" 
            :id="'option' + option.id" 
            :value="option.id" 
            @change="$emit('change-option', $event.target.value)"
            :checked="option.id === checkedId"
            ref="option"
            >
        <label :for="'option' + option.id">{{ option.name }}</label>
    </div>
</div>
</template>

<script>
export default {
    props: {
        checkedId: Number,
        placeholder: {
            type: String,
            required: true,
            default: 'Select option'
        },
        options: Array,
        name: String
    },
    methods: {
    }
}
</script>

<style lang="scss">
.form__elem-radio {
    margin-top: 25px;
    width: 100%;
    .form__radio-title {
        padding-bottom: 4px;
    }
    .form__radio-item {
        margin-top: 7px;
        display: flex;
        align-items: center;
        input {
            position: relative;
            width: 20px;
            height: 20px;
            appearance: none;
            outline: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            &:hover {
                cursor: pointer;
            }
            &::before {
                position: absolute;
                top: 50%;
                left: 50%;
                content: '';
                width: 20px;
                height: 20px;
                transform: translate(-50%, -50%);
                border: 1px solid #D0CFCF;
                border-radius: 100%;
            }
            &:checked::after {
                top: 50%;
                content: '';
                position: absolute;
                left: 50%;
                width: 10px;
                height: 10px;
                border-radius: 100%;
                visibility: visible;
                background-color: $blue;
                transform: translate(-50%, -50%);
            }
            &:checked::before {
                border-color: $blue;
            }
        }
        label {
            margin-left: 12px;
            font-size: 16px;
            line-height: 162%;
            &:hover {
                cursor: pointer;
            }
        }
    }
}    

@media(max-width: 1023px) {
    .post .form__elem-radio .form__radio-title {
        padding-bottom: 3px;
    }
}
</style>