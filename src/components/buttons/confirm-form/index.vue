<template>
    <button class="confirm-button" @click="$emit('click')">{{ label }}</button>
</template>
<script>
export default {
    props: {
        label: {
            default: ''
        }
    }
}
</script>
<style lang="scss" scoped>
.confirm-button {

    outline: none;
    cursor: pointer;
    height: 60px;
    color: $white;
    background-color: $secondary;
    width: 100%;
    font-size: 18px;
    font-weight: 500;
    box-shadow: 3px 5px 10px 0px $secondaryOpt20;
}
</style>