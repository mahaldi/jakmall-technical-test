<template>
	<div class="delivery-details">

		<div class="delivery-details__left">
			<HeadingForm heading="Delivery details"/>
			<div class="delivery-details__form-left">
				<Form ref="form" :model="model" :rules="rules">
					<FormItem prop="email">
						<Input id="email" label="Email" v-model="model.email"/>
					</FormItem>
					<FormItem prop="phone">
						<Input id="phone" label="Phone Number" v-model="model.phone"/>
					</FormItem>
					<FormItem prop="address">
						<TextArea id="address" label="Delivery Address" v-model="model.address"/>
					</FormItem>
				</Form>
			</div>
		</div>

		<div class="delivery-details__right">
			<div class="delivery-details__checkbox">
				<CheckBox v-model="isDropship" label="Send as Dropshipper" />
			</div>
			<div class="delivery-details__form-right">
				<Form :model="modelDropShip" :rules="rulesDropShip">
					<FormItem prop="dropshipName">
						<Input id="dropshipName" label="Dropshipper Name" v-model="modelDropShip.dropshipName" :disabled="!isDropship"/>
					</FormItem>
					<FormItem prop="dropshipPhone">
						<Input id="dropShipPhone" label="Dropshipper Phone Number" v-model="modelDropShip.dropshipPhone" :disabled="!isDropship"/>
					</FormItem>
				</Form>
			</div>
		</div>

	</div>
</template>
<script>
import Form from '@/components/forms'
import FormItem from '@/components/forms/form-item'
import Input from '@/components/input'
import HeadingForm from '@/components/forms/heading-form'
import CheckBox from '@/components/checkbox'
import TextArea from '@/components/text-area'

export default {
	data() {
		let PhoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-/,/0-9]*$/g
		return {
			isDropship: false,
			model: {
				email: '',
				phone: '',
				address: ''
			},
			modelDropShip: {
				dropshipName: '',
				dropshipPhone: ''
			},
			rulesDropShip: {
				dropshipName: [
					{ required: false, trigger: 'change' }
				],
				dropshipPhone: [
					{ required: false, trigger: 'change' },
					{ pattern : PhoneRegex, trigger: 'change'},
					{ min: 6, max: 20, trigger: 'change'}
				]
			},
			rules: {
				email: [
					{ required: true, trigger: 'change' },
					{ type: 'email', trigger: 'change' }
				],
				phone: [
					{ required: false, trigger: 'change' },
					{ pattern : PhoneRegex, trigger: 'change'},
					{ min: 6, max: 20, trigger: 'change'}
				],
				address: [
					{ required: true, trigger: 'change' },
					{ max: 120, trigger: 'change'}
				]
			}
		}
	},
	watch: {
		isDropship(val) {
			this.modelDropShip.dropshipName = ''
			this.modelDropShip.dropShipPhone = ''
			this.rulesDropShip.dropshipName[0].required = val
			this.rulesDropShip.dropshipPhone[0].required = val
		}
	},
	components: {
		Form,
		FormItem,
		Input,
		HeadingForm,
		CheckBox,
		TextArea
	}
}
</script>
<style lang="scss" src="./style.scss" scoped />