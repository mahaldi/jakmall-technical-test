export function wordSplitter(value, splitter, splitEvery) {
	function plainWord(number) {
		return number.toString().split(`${splitter}`).join('');
	}
	function reverseWord(input) {
		return [].map.call(input, function (x) {
			return x;
		}).reverse().join('');
	}
	let re = `.{1,${splitEvery}}`
	let regex = new RegExp(re, 'g');
	let plain = plainWord(value),
		reversed = reverseWord(plain),
		reversedWithSplitter = reversed.match(regex).join(`${splitter}`),
		normal = reverseWord(reversedWithSplitter);

	return normal;
}