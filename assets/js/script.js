function load_order() {
	var numbers = window.location.href.slice(window.location.href.indexOf('?s=') + 3).split("&")[0];
	var ar = [];
	for(let i = 0; i < numbers.length; i++) {
		ar.push("0123456789abcdefghijklmnopqrstuvwxyz".indexOf(numbers[i]));
	}
}

// Calculate results function.
function get_results(correct_answers) {
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('&') + 1).split('&');
	for(var i = 0; i < hashes.length; i++)
	{
		hash = hashes[i].split('=');
		vars[Number(hash[0])] = hash[1];
	}

	var numbers = window.location.href.slice(window.location.href.indexOf('?s=') + 3).split("&")[0];
	var ar = [];
	for(let i = 0; i < numbers.length; i++) {
		ar.push("0123456789abcdefghijklmnopqrstuvwxyz".indexOf(numbers[i]));
	}

	var rlytrue = 0;
	
	var maxval = vars.length;

	var a = 0;
	var b = 0;
	var c = 0;
	var d = 0;
	
	var trueslist = []
	for(var i = 0; i < maxval; i++){
		if (vars[i] == correct_answers[ar[i]]) {
			trueslist.push(1);
			rlytrue++;
		} else {
			trueslist.push(0);
		}
		if (vars[i] == "a") {
			a++;
		} else if (vars[i] == "b") {
			b++;
		} else if (vars[i] == "c") {
			c++;
		} else if (vars[i] == "d") {
			d++;
		}
	}

	var rlyfalse = maxval - rlytrue;

	return [ a,b,c,d,rlytrue,rlyfalse,maxval ];
}

String.prototype.cyb3r = function(seed = 0) {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < this.length; i++) {
        ch = this.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
    h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
    return (h2>>>0).toString(16).padStart(8,0)+(h1>>>0).toString(16).padStart(8,0);
};
