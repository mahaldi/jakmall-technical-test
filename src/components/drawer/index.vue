<template>
    <div class="drawer">
        <transition :name="`slide-${direction}`"
            @after-enter="afterEnter"
            @after-leave="afterLeave">
            <div :class="[`jakmall-drawer ${direction}`, { horizontal : isHorizontal }]" v-show="visible">
                <div class="jakmall-drawer__header" v-if="title">
                    <div class="jakmall-drawer__title">
                        {{ title }}
                    </div>
                    <div class="jakmall-drawer__close-button" @click="handleClose">
                        <span class="icon-cancel-1"></span>
                    </div>
                </div>
                <div class="jakmall-drawer__container" :style="isHorizontal ? `width: ${size + sizeUnit};` : `height: ${size + sizeUnit};`">
                    <slot></slot>
                </div>
            </div>
        </transition>
        <transition name="fade">
            <Overlay v-show="visible" :isOverlayFull="true" @click="handleClose"/>
        </transition>
    </div>
</template>
<script>
import Overlay from '@/components/overlay'
export default {
    props : {
        visible : {
            type : Boolean,
            required : true
        },
        title : {
            type : String,
            default : null
        },
        direction: {
            type: String,
            default: 'btt',
            validator(val) {
                return ['btt'].indexOf(val) !== -1;
            }
        },
        size : {
            type : Number,
            default : 300
        },
        sizeUnit : {
            type : String,
            default : 'px',
            validator (val) {
                return ['px', 'vw', 'vh'].indexOf(val) !== -1;
            }
        },
        isAppendToBody : { 
            type : Boolean,
            default : true // if append to body is true then u need to delete scoped attribute when import style
        }
    },
    components : {
        Overlay
    },
    computed: {
        isHorizontal() {
            return this.direction === 'rtl' || this.direction === 'ltr';
        }
    },
    watch : {
        visible(val){
            if(val){
                document.body.style.overflow = 'hidden';
                this.$emit('open')
                if(this.isAppendToBody)
                    this.appendToBody()
            }else{
                document.body.style.overflow = 'auto';
            }
            
        }
    },
    methods : {
        handleClose(){
            this.$emit('update:visible', false)
            this.emitClose()
        },
        emitClose(){
            this.$emit('close');
        },
        afterEnter() {
            this.$emit('opened');
        },
        afterLeave() {
            this.$emit('closed');
            if(this.isAppendToBody)
                this.destroyEl()
        },
        appendToBody(){
            if (this.visible) {
                document.body.appendChild(this.$el);
            }
        },
        destroyEl(){
            if (this.appendToBody && this.$el && this.$el.parentNode) {
                this.$el.parentNode.removeChild(this.$el);
            }
        }
    },
    mounted(){
        if(this.isAppendToBody && this.visible)
            this.appendToBody()
    }
}
</script>
<style lang="scss" src="./style.scss" />