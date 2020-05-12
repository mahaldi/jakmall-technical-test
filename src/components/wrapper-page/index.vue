<template>
    <div class="jakmall-wrapper">
        <div class="jakmall-wrapper__box">
            <slot></slot>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.jakmall-wrapper {
    $self: &;
    min-width: 100vw;
    min-height: 100vh;
    padding-top: 55px;
    background-color: $primary;
    &__box {
        position: relative;
        display: flex;
        background-color: $white;
        width: fit-content;
        padding: 52px 20px 20px 50px;
        margin: auto auto;
        min-width: 1100px;
        height: fit-content;
        min-height: 550px;
        box-shadow: 2px 10px 20px 0px $secondaryOpt10;
        @include mq-medium {
            min-width: auto;
            width: 100%;
            display: block;
            padding-left: 16px;
            padding-right: 16px;
        }
    }
}
</style>