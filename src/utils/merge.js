export default {
	methods: {
		objectAssign(target) {
			for (let i = 1, j = arguments.length; i < j; i++) { // argument : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments
				let source = arguments[i] || {};
				for (let prop in source) {
					if (Object.prototype.hasOwnProperty.call(source, prop)) { // hasOwnProperty https://stackoverflow.com/questions/9396569/javascript-what-is-property-in-hasownproperty
						let value = source[prop];
						if (value !== undefined) {
							target[prop] = value;
						}
					}
				}
			}
			return target;
		}
	}
}