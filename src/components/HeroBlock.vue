<template>
    <section class="hero">
        <div class="container">
            <div class="hero__wrapp">
                <ui-heading>Test assignment for front-end developer</ui-heading>
                <div class="hero__descr">
                    <ui-text>What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</ui-text>
                </div>
                <ui-button 
                    :type="'link'" 
                    :href="'#signup'" 
                    :class="'link__item'"
                >Sign up</ui-button>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    
}
</script>

<style lang="scss">
.hero {
    .container {
        color: #fff;
        padding-left: 15px;
        padding-right: 15px;
        background: linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url('../assets/img/hero_bg.webp') top center/cover no-repeat;
        background-origin: content-box;
        background-clip: content-box;
    }
    .hero__wrapp {
        padding: 164px 0 163px;
        max-width: 380px;
        margin-left: auto;
        margin-right: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .hero__descr {
        margin-top: 22px;
        text-align: center;
    }
    .btn {
        margin-top: 33px;
    }
}    

@media (max-width: 1199px) {
    .hero .container {
        max-width: 100%;
        background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),url('../assets/img/hero_bg-tablet.webp') top center/cover no-repeat;
        background-clip: unset;
    }
}

@media(max-width: 1023px) {
    .hero .hero__wrapp {
        padding: 89px 0 88px;
    }
}

@media(max-width: 767px) {
    .hero .hero__wrapp {
        padding: 40px 0 71px;
    }
    .hero .container {
        background-size: 100% 100%;    
    }
}
</style>