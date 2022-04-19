<template>
    <PageHeader />
    <HeroBlock />
    <GetBlock ref="get" />    
    <PostBlock @add-user="$refs.get.reset()"/>
</template>

<script>
import PageHeader from './components/PageHeader.vue'
import HeroBlock from './components/HeroBlock.vue'
import GetBlock from './components/GetBlock.vue'
import PostBlock from './components/PostBlock.vue'


export default {
  name: 'App',
  components: {
    PageHeader,
    HeroBlock,
    GetBlock,
    PostBlock
  },
}
</script>

<style lang="scss">
@font-face {
    font-family: 'Nunito';
    font-display: swap;
    src: url('./assets/fonts/Nunito-Regular.ttf');
}
*, *::before, *::after {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Nunito', sans-serif;
}

a {
    color: unset;
    text-decoration: none;
}

.container {
    max-width: 1200px;
    padding-left: 15px;
    padding-right: 15px;
    margin: 0 auto;
}

section:not(:nth-child(2)) {
    margin-top: 139px;
}

#app {
    background-color: $light-gray;
    padding-bottom: 100px;
    font-size: 16px;
    line-height: 162%;
}


@media (max-width: 1199px) {
    .container {
        max-width: 934px;
    }
}

@media(max-width: 1023px) {
    .container {
        max-width: 734px;
    }
}

@media(max-width: 767px) {
    .container {
        max-width: 358px;
    }
}
</style>
