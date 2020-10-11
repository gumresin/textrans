class Dico {
	constructor(alphabet="",dicoen=[]) {
		this.alphabet = alphabet;
		this.dicoen = dicoen;
		this.parse(ENGLISH_DICO);
	}
	get_dico () { return this.dicoen;}
	parse(str) { // takes the dico in string, with " " separators, and transforms the internal dictionary
		const words = str.split(' ');
		this.dicoen = words;
	}
}
