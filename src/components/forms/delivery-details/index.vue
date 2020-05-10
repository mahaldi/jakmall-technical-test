<template>
    <Form ref="form" :model="model" :rules="rules">
			<FormItem prop="email">
				<Input id="email" label="Email" v-model="model.email"/>
			</FormItem>
			<FormItem prop="phone">
				<Input id="phone" label="Phone Number" v-model="model.phone"/>
			</FormItem>
			<FormItem prop="dropshipName">
				<Input id="dropshipName" label="Dropshipper Name" v-model="model.dropshipName" disabled/>
			</FormItem>
    </Form>
</template>
<script>
import Form from '@/components/forms'
import FormItem from '@/components/forms/form-item'
import Input from '@/components/input'

export default {
	data() {
		return {
			model: {
				email: '',
				phone: '',
				dropshipName: ''
			},

			rules: {
				email: [
					{ required: true, trigger: 'change' },
					{ type: 'email', trigger: 'change' }
				],
				phone: [
					{ required: true, trigger: 'change' },
					{ pattern : /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-/,/0-9]*$/g, trigger: 'change'},
					{ min: 6, max: 20, trigger: 'change'}
				],
				dropshipName: [
					{ required: false, trigger: 'change' }
				]
			}
		}
	},
	components: {
		Form,
		FormItem,
		Input
	}
}
</script>
<style lang="scss" src="./style.scss" scoped />