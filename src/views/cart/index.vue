<template>
    <Wrapper modifierClass="cart">
        <div class="cart__heading">
            <Heading heading="Cart"/>
        </div>
        <CardCart v-for="(item,idx) in 1" @total="total" :key="idx"/>
        <div class="cart__button">
            <ConfirmButton :label="`Bayar ${wordSplitter(totalProduct)}`"  @click="onClick"/>
        </div>
    </Wrapper>
</template>
<script>
const Wrapper = () => import('@/components/wrapper-page')
const CardCart = () => import('@/components/card')
const Heading = () => import('@/components/forms/heading-form')
const ConfirmButton = () => import('@/components/buttons/confirm-form')
import Cookies from 'js-cookie'
import { wordSplitter } from '@/utils/helper'

export default {
    components: {
        Wrapper,
        CardCart,
        Heading,
        ConfirmButton
    },
    data() {
        return {
            totalProduct: 0,
            qty: 0
        }
    },
    methods: {
        total(val) {
            this.totalProduct = val.total
            this.qty = val.qty
        },
        onClick() {
            Cookies.set('item', {
                total: this.totalProduct,
                qty: this.qty
            })
            this.$router.push({ path: '/payment?step=1' })
            this.$store.dispatch('payment/setItem', {
                total: this.totalProduct,
                qty: this.qty
            })
        },
        wordSplitter(value) {
            return wordSplitter(value, ',', 3)
        }
    }
}
</script>
<style lang="scss" src="./style.scss" />