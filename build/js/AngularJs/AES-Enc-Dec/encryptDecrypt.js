var input;
var key = CryptoJS.enc.Hex.parse('3a36b70a530104f61b64db382fac934f');
var ive = CryptoJS.enc.Hex.parse('7369787465656e62797465736c6f6e67');
var encrypted;
var decrypted;
function encode(input) { 
	encrypted = CryptoJS.AES.encrypt(input, key, {iv: ive}).ciphertext;
	return encrypted;
}

function decode(input) {
	var enc = CryptoJS.enc.Hex.parse(input);
	decrypted = CryptoJS.AES.decrypt(enc.toString(CryptoJS.enc.Base64), key, {iv: ive}).toString(CryptoJS.enc.Utf8);
	return decrypted;
}