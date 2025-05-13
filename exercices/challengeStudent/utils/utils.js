export const extractArg = (text) => {
	const elem = text.split(' ')
	if (elem.length < 3) return elem[1];
	return elem[1] + ' ' + elem[2]
}

//exports.extractArg = extractArg // export nommé CommonJS

// module.exports = {
// 	extractArg,
// 	name: "Hello"
// }
// Export par default CommonJS

//export default extractArg