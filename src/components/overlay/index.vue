<template>
    <div class="jakmall-overlay" :class="{ 'jakmall-overlay__full' : isOverlayFull }" @click.stop="$emit('click')"></div>
</template>
<script>
export default {
    props : {
        isOverlayFull : {
            type : Boolean,
            default : false
        }
    }
}
</script>
<style lang="scss" scoped>
.jakmall-overlay{
    $self: &;
    background: #000000;
    opacity: 0.8;
    width: 100%;
    height: 100%;
    z-index: 997;
    padding: 20px;
    position: fixed;
    top: 8%;
    &__full{
        cursor: pointer;
        top: 0;
        z-index: 2000;
        padding: 0;
    }
}
</style>