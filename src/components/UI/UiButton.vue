<template>
    <a v-if="type === 'link'"
        :href="href"
        class="btn"
        :class="className"
    >
        <slot />
    </a>

    <button 
        v-else-if="type === 'button'"
        class="btn"
        :class="className"
    ><slot /></button>

    <button 
        v-else-if="type === 'submit'"
        class="btn"
        :type="type"
        :class="className"
        :disabled="disabled"
    ><slot /></button>
</template>

<script>
export default {
    props: ['type', 'href', 'className', 'disabled']
}
</script>

<style lang="scss">
.btn {
    color: rgba(0,0,0,0.87);
    background-color: $yellow;
    border-radius: 80px;
    padding: 4px 18px;
    font-size: 16px;
    line-height: 162%;
    min-width: 100px;
    text-align: center;
    display: inline-block;
    border: none;
    transition: 0.5s ease;
    &:hover {
        background-color: #ffe302;
        cursor: pointer;
    }
    &:disabled {
        background-color: #b4b4b4;
        color: rgba(255,255,255,0.87);
        cursor: unset;
    }
}
</style>