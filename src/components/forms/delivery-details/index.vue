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
				<Form ref="dropship" :model="dropShip" :rules="rulesDropShip">
					<FormItem prop="name">
						<Input id="dropshipName" label="Dropshipper Name" v-model="dropShip.name" :disabled="!isDropship"/>
					</FormItem>
					<FormItem prop="phone">
						<Input id="dropShipPhone" label="Dropshipper Phone Number" v-model="dropShip.phone" :disabled="!isDropship"/>
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
import Cookies from 'js-cookie'

export default {
	props: {
		currentDetail: {
			default: null
		}
	},
	data() {
		let PhoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-/,/0-9]*$/g

		return {
			isDropship: false ,
			test: {
				name: 'asdasdasd'
			},
			model: {
				email: '',
				phone: '',
				address: ''
			},
			dropShip: {
				name: '',
				phone: ''
			},
			modelDropShip: {
				dropshipName: '',
				dropshipPhone: ''
			},
			rulesDropShip: {
				name: [
					{ required: false, trigger: 'change' }
				],
				phone: [
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
			if( !val ) {
				this.dropShip.name = ''
				this.dropShip.phone = ''
			}
			this.rulesDropShip.name[0].required = val
			this.rulesDropShip.phone[0].required = val
			this.dispatchForm()
		}
	},
	components: {
		Form,
		FormItem,
		Input,
		HeadingForm,
		CheckBox,
		TextArea
	},
	methods: {
		dispatchForm() {
			let payload = {
				email: this.model.email,
				phone: this.model.phone,
				address: this.model.address,
				isDropship: this.isDropship,
				dropshipName: this.dropShip.name,
				dropshipPhone: this.dropShip.phone
			}
			let payment = JSON.parse(Cookies.get('payment'))
			payment.form1 = payload
			Cookies.set('payment', payment)
			this.$store.dispatch('payment/setCurrentDetail', payment)
		},
		validate() {
			let form1, form2

			this.$refs.form.validate((valid) => {
				form1 = valid
				return valid
			});
			this.$refs.dropship.validate((valid) => {
				form2 = valid
				return valid
			});
			return form1 && form2
		},
		onSubmit() {
			this.dispatchForm()
			return this.validate()
		},
		prepopulate() {
			this.model.email = this.currentDetail.email
			this.model.phone = this.currentDetail.phone
			this.model.address = this.currentDetail.address

			this.isDropship = this.currentDetail.isDropship

			this.dropShip.name = this.currentDetail.dropshipName
			this.dropShip.phone = this.currentDetail.dropshipPhone
			
		}
	},
	mounted() {
		if( this.currentDetail ){
			this.prepopulate()
			this.validate()
		}
	}
}
</script>
<style lang="scss" src="./style.scss" scoped />