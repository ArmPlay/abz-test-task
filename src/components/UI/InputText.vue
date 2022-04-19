<template>
    <div class="form__elem" :class="error ? 'invalid' : ''">

        <template v-if="!(myMask)"> <!-- if the mask does not exist -->
            <input 
                type="text" 
                :name="nameField"
                :required="required"
                :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)"
                >
        </template>

        <template v-else> 
            <input 
                type="text" 
                :name="nameField"
                :required="required"
                :value="modelValue" 
                @input="$emit('update:modelValue', $event.target.value)"                 
                v-mask="myMask"
            />
        </template>

        <label 
            :for="nameField"
            :class="modelValue.length ? 'fixed' : ''"
        >{{ placeholder }}</label>
        <div v-if="error" class="form__elem-invalid">
            <span>{{ error }}</span>
        </div>
        <div v-else-if="helper" class="form__elem-helper">{{ helper }}</div>
        </div>
</template>

<script>
import { mask } from 'vue-the-mask'

export default {
    props: {
        placeholder: String,
        nameField: String,
        required: Boolean,
        modelValue: {
            type: String,
        },
        helper: {
            type: String,
            required: false,
            default: ''
        },
        myMask: {
            default: false,
        },
        error: {
            default: ''
        }
    },
    data: () => ({
        inputValue: ''
    }),
    directives: {mask}
}
</script>

<style lang="scss">
    .form__elem {
        margin-top: 48px;
        width: 100%;
        position: relative;
        input {
            font-size: 16px;
            line-height: 162%;
            width: 100%;
            border: 1px solid #d0cfcf;
            padding: 14px 16px;
            border-radius: 4px;
            background-color: rgba(0,0,0,0);
            outline: none;
            transition: 0.5s ease;
            &::placeholder {
                color: #7e7e7e;
                font-size: 16px;
                line-height: 162%;
            }
        }
        &.invalid {
            input {
                border: 2px solid $error;
            }
            label {
                color: $error;
            }
        }
        label {
            position: absolute;
            top: 15px;
            left: 17px;
            transition: 0.5s ease;
            color: #7e7e7e;
            pointer-events: none;
            background-color: #f8f8f8;
            &.fixed {
                top: -5px;
                padding: 0 4px;
                font-size: 12px;
                line-height: 14px;
            }
        }
        input:focus ~ label {
            top: -5px;
            padding: 0 4px;
            font-size: 12px;
            line-height: 14px;
        }
    }    
</style>