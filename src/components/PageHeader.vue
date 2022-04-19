<template>
    <header class="header">
            <div class="container">
                <app-logo :class="'header__logo'"></app-logo>
                <div class="header__links">
                    <ui-button :type="'link'" :href="'#users'" :class="'link__item'">Users</ui-button>
                    <ui-button :type="'link'" :href="'#signup'" :class="'link__item'">Sign up</ui-button>
                </div>
            </div>
  </header>
</template>

<script>
import AppLogo from './AppLogo.vue'

export default {
    components: {
        AppLogo
    }
}
</script>

<style lang="scss" scoped>
.header {
    padding: 13px 0;
    .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .header__links {
            display: flex;
            .link__item:first-child {
                margin-right: 10px;
            }
        }
        .header__logo img {
            display: block;
        }
    }
}
</style>