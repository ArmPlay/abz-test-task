<template>
    <div class="users__list">
        <div class="user__item" v-for="(user, idx) in users" :key="idx">
            <div class="user__item-pic">
                <img :src="user.photo" loading="lazy" :alt="user.name">
            </div>
            <div class="user__item-title" 
                :data-tooltip="user.name">
                <span>{{ user.name }}</span>
            </div>
            <div class="user__item-body">
                <div class="user__body-position"
                    :data-tooltip="user.position">
                    <span>{{ user.position }}</span>
                </div>
                <div class="user__body-email"
                    :data-tooltip="user.email">
                    <span>{{ user.email }}</span>
                </div>
                <div class="user__body-phone"
                    :data-tooltip="user.phone">
                    <span>{{ user.phone }}</span>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
export default {
    props: {
        users: Array
    }
}
</script>

<style lang="scss">
    .users__list {
        padding-top: 22px;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        width: 100%;
        .user__item {
            margin-top: 28px;
            background-color: #fff;
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            border-radius: 10px;
            max-width: calc(33.3% - 20px * 0.980);
            &:not(:nth-child(3n)) {
                margin-right: 30px;
            }
            &-pic {
                overflow: hidden;
                border-radius: 100%;
                img {
                    display: block;
                    width: 70px;
                    height: 70px;
                }
            }
            &-title {
                margin-top: 21px;
                position: relative;
                max-width: 100%;
                span {
                    @include limitfield;
                }
                @include tooltip;
            }
            &-body {
                margin-top: 20px;
                text-align: center;
                width: 100%;
                & > * span {
                    @include limitfield;
                }
                & > * {
                    position: relative;
                    @include tooltip;
                    &::after {
                        word-break: break-word;
                    }
                }
            }
        }
    }
    
    @media (max-width: 1199px) {
        .get .users__list .user__item:not(:nth-child(3n)) {
            margin-right: 29px;
        }
        .get .users__list .user__item {
            max-width: calc(33.35% - 20px * 0.98);
        }
    }

    @media(max-width: 1023px) {
        .get .users__list .user__item {
            max-width: calc(50% - 8px);
            margin-top: 16px;
            &:nth-child(3n),
            &:nth-child(2n) {
                margin-right: 0;
            }
            &:nth-child(2n - 1) {
                margin-right: 16px;
            }
        }
        .get .users__list {
            padding-top: 34px;
        }
    }

    @media(max-width: 767px) {
        .get .users__list .user__item:nth-child(1n) {
            margin-right: 0;
            max-width: 100%;
            margin-top: 20px;
        }
        .get .users__list {
            padding-top: 28px;
        }        
    }
</style>