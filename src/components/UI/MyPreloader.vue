<template>
    <div class="preloader__wrapp">
        <div class="preloader"></div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss">
    @keyframes load {
        from {
            transform: rotate(0deg)
        }
        to {
            transform: rotate(360deg);
        }
    }
    .preloader__wrapp {
        width: 100%;
        margin-top: 20px;
        padding: 50px;
        .preloader {
            width: 48px;
            height: 48px;
            margin: 0 auto;
            transition: 0.5s ease;
            animation: load 1s infinite;
            background: url('../../assets/img/preloader.svg') center center/auto no-repeat;
        }
    }
</style>