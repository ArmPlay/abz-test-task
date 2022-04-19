<template>
    <div :class="className"><img src="../assets/img/logo.svg" alt="Logo"></div>
</template>

<script>
export default {
    props: ['className']
}
</script>

<style lang="scss" scoped>
    img {
        width: 104px;
        height: 26px;
    }
</style>