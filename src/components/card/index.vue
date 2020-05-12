<template>
    <div class="card-cart">
        <div class="card-cart__image">
            <img class="card-cart__image-element" src="https://target.scene7.com/is/image/Target/GUEST_8b7e8ef0-c1b5-45cf-956e-bb31b799a80a?wid=488&hei=488&fmt=pjpeg"/>
        </div>
        <div class="card-cart__info">
            <p class="jakmall-text jakmall-text--bold">Samsung Led cover case</p>
            <p class="jakmall-text">Rp. {{ wordSplitter(price) }}</p>
            <p class="jakmal-text">Qty: {{ qtyLeft }}</p>
        </div>
        <div class="card-cart__counter">
            <div class="card-cart__counter-btn" @click="counter('min')">-</div>
            <input class="card-cart__counter-input" v-model="qty" type="text"/>
            <div class="card-cart__counter-btn" @click="counter('add')">+</div>
        </div>
    </div>
</template>
<script>
import { wordSplitter } from '@/utils/helper'
export default {
    data() {
        return {
            qtyLeft: 10,
            qty: 1,
            price: 500000
        }
    },
    computed: {
        total() {
            return this.qty * this.price
        }
    },
    watch: {
        total(val){
            this.$emit('total', {
                total: val,
                qty: this.qty
            })
        }
    },
    methods: {
        wordSplitter(value) {
            return wordSplitter(value, ',', 3)
        },
        counter(type) {
            if(type === 'add') {
                if( this.qtyLeft > this.qty )
                    this.qty += 1
            } else {
                if(this.qty > 1) {
                    this.qty -= 1
                }
            }
        }
    },
    mounted() {
        this.$emit('total', {
                total: this.total,
                qty: this.qty
            })
    }
}
</script>
<style lang="scss" src="./style.scss" scoped />