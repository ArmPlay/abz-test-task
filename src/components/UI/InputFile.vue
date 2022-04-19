<template>
    <div class="form__elem-file" :class=" error ? 'invalid' : '' ">
        <input type="file" 
            @change="$emit('change-picture', $event)" 
            :name="nameField" 
            id="input__photo"
            accept="image/jpeg"
        >
        <div class="form__file-label">
            <div class="label__left">Upload</div>
            <div class="label__value" :class=" photoObject.name ? 'filled' : '' ">{{ photoObject.name ? photoObject.name : 'Upload your photo' }}</div>
        </div>
        <div v-if="error" class="form__elem-invalid">
            <span>{{ error }}</span>
        </div>
        <div v-else-if="helper" class="form__elem-helper">{{ helper }}</div>
    </div>    
</template>

<script>
export default {
    emits: ['change-picture'],
    props: {
        nameField: {
            type: String,
            required: true
        },
        photoObject: {
            type: Object,
            required: true,
            default: () => {
                return { }
            }
        },
        error: {
            type: String,
            default: ''
        },
        helper: {
            type: String,
            default: ''
        }
    },
    data: () => ({
        filename: '',
        reason: ''
    }),
    methods: {
    }
}
</script>

<style lang="scss">
    .form__elem-file {
        margin-top: 47px;
        position: relative;
        width: 100%;
        input {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: 0;
            width: 100%;
            &:hover {
                cursor: pointer;
            }
        }
        .form__file-label {
            width: 100%;
            display: flex;
            .label__left {
                border-radius: 4px 0 0 4px;
                border: 1px solid rgba(0,0,0,.87);
                padding: 14px 15px;
                display: flex;
                align-items: center;
            }
            .label__value {
                border-radius: 0 4px 4px 0;
                padding: 14px 16px;
                width: 100%;
                color: #7e7e7e;
                border: 1px solid #d0cfcf;
                word-break: break-all;
                &.filled {
                    color: rgba(0,0,0,.87);
                }
            }
        }
        &.invalid {
            .label__left {
                border: 2px solid $error;
            }
            .label__value {
                border: 2px solid $error;
                border-left-width: 0;
            }
        }
    }    

    @media(max-width: 1199px) {
        .form__elem-file {
            margin-top: 44px;
        }
    }

    @media(max-width: 1023px) {
        .post .form__elem-file {
            margin-top: 45px;
        }
    }
</style>