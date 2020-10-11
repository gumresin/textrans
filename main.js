//require(['dico'], function(dico) {


/*document.getElementById("onenew").addEventListener("click", onenew);*/

const larg_txt = 3; // width of text displayed
const sleep_time = 50; // in ms
const sleep_time_words = 2000; // in ms

var displayed_txt = document.getElementById("several"); 
var displayed_detected_words = document.getElementById("detected_words"); 
var displayed_words = document.getElementById("words"); 
var detected_wordsTot = "";
var txtTot = "";
var wordsTot = "";

function sleep(ms) {
return new Promise(resolve => setTimeout(resolve, ms));
}

var dico = new Dico();
document.getElementById("constnew").addEventListener("click", traiter);
document.getElementById("constantly_new_words").addEventListener("click", traiter_words);
console.log(dico.get_dico());

class Word {
	constructor (prev="",curr="") {
		this.prev = prev;
		this.curr = curr;
	}
	new_elm (x,dicoo) {
		if (x==" ") {
			this.prev = this.curr;
			this.curr = "";
			if (this.prev.length >= 2) { this.treat_word(dicoo); }
		}
		else { this.curr += x; }
	}
	treat_word(dicoo) {
		if (dicoo.dicoen.includes(this.prev.toLowerCase())) { // check if it's in the dictionary
			detected_wordsTot += this.prev + " ";
		}
	}
}

var W = new Word();


let getJSON = (url,callback) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = () => {
        let status = xhr.status;
        if (status == 200) {
            callback(null, xhr.response);
        } else {
            callback(status);
        }
    };
    xhr.send();
};

function new_letter(dicoo) {
getJSON('https://qrng.anu.edu.au/API/jsonI.php?length=1&type=uint8&size=1', (err, data) => {
    if (err != null) {
        console.error(err);
    } else {
	    /*let text = `Data: ${data.data}*//*Type: ${data.type}*//*Success: ${data.success}*//*Length: ${data.length}`*/
        let dat = `${data.data}`
	var dat2 = JSON.stringify(dat)
	var dat3 = dat2.substring(1,dat2.length-1);
	//console.log(dat2);
	   letter = letter_from_number(dat3)
	txtTot += letter;
	W.new_elm(letter,dicoo);
    }
});
}
function new_word(dicoo) {
getJSON('https://qrng.anu.edu.au/API/jsonI.php?length=1&type=uint16&size=1', (err, data) => {
    if (err != null) {
        console.error(err);
    } else {
        let dat = `${data.data}`
	var dat2 = JSON.stringify(dat)
	var dat3 = dat2.substring(1,dat2.length-1);
	 wordsTot += word_from_number(dat3,dicoo) + " ";
    }
});
}

async function traiter() {
	while (true) {
		await new_letter(dico);
		//if (txtTot.length%larg_txt == 0) {txtTot += "\n";}
		if (check(displayed_txt)) {txtTot = "";}
		if (check(displayed_detected_words)) {detected_wordsTot = "";}
		displayed_txt.innerHTML = txtTot;
		displayed_detected_words.innerHTML = detected_wordsTot;
		await sleep(sleep_time);
	}
}

async function traiter_words() {
	while (true) {
		await new_word(dico);
		if (check(displayed_words)) {wordsTot = "";}
		displayed_words.innerHTML = wordsTot;
		await sleep(sleep_time_words);
	}
}


function check(element) {  // checks whether the div is overflown
	var curOverf = element.style.overflow; 
	if ( !curOverf || curOverf === "visible" ) 
	element.style.overflow = "hidden"; 
	var isOverflowing = element.clientWidth < element.scrollWidth
	|| element.clientHeight < element.scrollHeight; 
	element.style.overflow = curOverf; 
	return isOverflowing; 
} 


const alphabet = "       abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZaeiou        ";
const bits = 256;
//const bits = Math.pow(2,8);
if (alphabet.length >= bits) {
	console.log("alphabet too long");
}

function letter_from_number (n) {
	N = alphabet.length;
	var k = Math.floor(N*(bits-n)/bits);
	return alphabet.substr(k,1);
}

function word_from_number (n,dicoo) {
	N = dicoo.dicoen.length;
	bitts = Math.pow(2,16);
	var k = Math.floor(N*(bitts-n)/bitts);
	return dicoo.dicoen[k];
}


//}); // require
