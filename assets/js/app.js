export default {
	methods: {
		answer(ans) {
			if(!this.show_next_button) {
				var answer_id = "abcd".indexOf(ans);
				var correct_answer_id = "abcd".indexOf(this.correct_answers[this.question_order[this.number]]);
				if(answer_id == correct_answer_id) {
					this.correct_banner = true;
					switch(answer_id) {
						case 0:
							this.a_correct = true;
							this.a_cw = true;
							break;
						case 1:
							this.b_correct = true;
							this.b_cw = true;
							break;
						case 2:
							this.c_correct = true;
							this.c_cw = true;
							break;
						case 3:
							this.d_correct = true;
							this.d_cw = true;
							break;		
					}

				} else {
					this.wrong_banner = true;
					switch(correct_answer_id) {
						case 0:
							this.a_correct = true;
							this.a_cw = true;
							break;
						case 1:
							this.b_correct = true;
							this.b_cw = true;
							break;
						case 2:
							this.c_correct = true;
							this.c_cw = true;
							break;
						case 3:
							this.d_correct = true;
							this.d_cw = true;
							break;		
					}
					switch(answer_id) {
						case 0:
							this.a_wrong = true;
							this.a_cw = true;
							break;
						case 1:
							this.b_wrong = true;
							this.b_cw = true;
							break;
						case 2:
							this.c_wrong = true;
							this.c_cw = true;
							break;
						case 3:
							this.d_wrong = true;
							this.d_cw = true;
							break;		
					}
				}
				this.show = false;
				this.given_answers.push(ans);
				console.log(this.given_answers);
				this.show_next_button = true;
				var that = this;
				setTimeout(function() {
					that.correct_banner = false;
					that.wrong_banner = false;
				}, 1500);
			}
		},
		next_question() {
			this.a_cw = false;
			this.b_cw = false;
			this.c_cw = false;
			this.d_cw = false;
			this.show_next_button = false;

			this.showq = false;

			if(this.number >= this.question_order.length-1) {
				var link = "../r/?s=";
				link += window.location.href.slice(window.location.href.indexOf('?s=') + 3);
				for(let i = 0; i < this.question_order.length; i++) {
					link += "&";
					link += this.question_order[i];
					link += "=";
					link += this.given_answers[i];
				}
				var nowtime = Date.now();
				link += "&time="+(nowtime-this.time)/1000;
				window.open(link,"_self");
			}

			var that = this;
			setTimeout(function() {
				that.a_correct = false;
				that.a_wrong = false;
				that.b_correct = false;
				that.b_wrong = false;
				that.c_correct = false;
				that.c_wrong = false;
				that.d_correct = false;
				that.d_wrong = false;

				that.number++;
				that.show = true;
				that.showq = true;
			}, 1000);
		},
		wait_loader() {
			this.showb = 0;
			var that = this
			setTimeout(function() {
				that.showb = true;
			}, 1000);
		},
		get_results() {
			var vars = [], hash;
			var hashes = window.location.href.slice(window.location.href.indexOf('&') + 1).split('&');
			for(var i = 0; i < hashes.length; i++)
			{
				hash = hashes[i].split('=');
				vars.push(hash[1]);
			}
			this.vars = vars;

			var rlytrue = 0;
			
			var maxval = this.vars.length-1;

			var a = 0;
			var b = 0;
			var c = 0;
			var d = 0;
			
			var trueslist = []
			for(var i = 0; i < maxval; i++){
				if (this.vars[i] == this.correct_answers[this.question_order[i]]) {
					trueslist.push(1);
					rlytrue++;
				} else {
					trueslist.push(0);
				}
				switch(this.vars[i]) {
					case "a":
						a++;
						break;
					case "b":
						b++;
						break;
					case "c":
						c++;
						break;
					case "d":
						d++;
						break;
				}
			}

			var rlyfalse = maxval - rlytrue;

			this.results = [ a,b,c,d,rlytrue,rlyfalse,trueslist,maxval ];
		},
		load_order() {
			var numbers = window.location.href.slice(window.location.href.indexOf('?s=') + 3).split("&")[0];
			var ar = [];
			for(let i = 0; i < numbers.length; i++) {
				ar.push("0123456789abcdefghijklmnopqrstuvwxyz".indexOf(numbers[i]));
			}
			this.question_order = ar;
		},
		load_got_seed() {
			if(window.location.href.search("/?ns=") != -1) {
				var got_seed = window.location.href.slice(window.location.href.indexOf('?ns=') + 4).split("&")[0];
				this.got_seed = got_seed;
			}
		},
		save_time() {
			this.time = Date.now();
			if(window.location.href.search("&time=") != -1) {
				this.time = window.location.href.slice(window.location.href.indexOf('&time=') + 6).split("&")[0];
			}
		}
	},
	created: function() {
		this.load_order();
		this.wait_loader();
		this.get_results();
		this.load_got_seed();
		this.save_time();
	},
	data() {
		return {
			/* das hier kann man ??ndern */
			questions: [
				'Was ist das beliebteste Soziale Medium der Deutschen Jugendlichen?',
				'Ab welchem Alter darf man WhatsApp offiziell nutzen?',
				'F??r welche Summe hat Facebook Whatsapp 2014 gekauft?',
				'Wie nennt man die bei Messengern ??bliche Verschl??sselungs-Methode?',
				'Welches Profilbild sollte man in Sozialen Medien am ehesten verwenden?',
				'Wie viel Prozent der deutschen Jugendlichen (12-19 J.) geben an,\n dass bereits falsche oder beleidigende Dinge ??ber sie im Internet\nverbreitet wurden?',
				'Was ist das sicherste Passwort?',
				'Was ist Discord?',
				'Wie viel verdient Mark Zuckerberg pro Tag?',
				'Was ist LinkedIn?',
				'Was bedeutet finsta?',
				'Wer hat die meisten Follower auf Instagram?',
				'Seit wann gibt es Instagram?',
				'Wie hei??t der Vorg??nger von TikTok?',
				'Wieviele Minuten verbringt ein durchschnittlicher deutscher\nJugendlicher t??glich online?',
				'Wie wird eine Person genannt, die Fake News aus\nVergn??gen und f??r Aufmerksamkeit erstellt?',
				'YouTube hat eine Plattform f??r Kinder. Wie hei??t sie?',
				'Wann kam das erste Handy auf den Markt?',
				'Wie hei??t eine von Donald Trump 2022 gegr??ndete Social-Media-Plattform?',
				'Wie nennt man ein gef??lschtes Video von einer Person,\ndas mithilfe k??nstlicher Intelligenz erstellt wurde?',
				'Was ist ein Social Bot?',
				'Welche Informationen sollten auf meinem\nSocial-Media-Profil ??ffentlich sichtbar sein?',
				'Was ist keine sicherere Alternative zu WhatsApp?',
				'Was ist Hate Speech?'
			],
			answers: [
				[ 'Facebook', 'WhatsApp', 'TikTok', 'Instagram' ],
				[ '12 Jahre', '14 Jahre', '16 Jahre', '18 Jahre' ],
				[ '14 Mio. ???', '140 Mio. ???', '1.4 Mrd. ???', '14 Mrd. ???' ],
				[ 'Ende-zu-Ende', 'SHA-256', 'argon2id', 'C??sar-Verschl??sselung' ],
				[ 'Das Ortsschild seines Wohnortes', 'Ein cooles Bild von sich selbst', 'Ein Foto der Schule', 'Einen s?????en Hamster' ],
				[ '6%', '10%', '21%', '42%' ],
				[ 'Passwort', 'Baum1234', 'MOgj7u9/0idK!', 'tmLtUkWfaJfkjhq6Xdyp' ], //Meine Oma geht jeden Sonntag um 9:00 in die Kirche!
				[ 'ein Messenger', 'ein Onlineshop', 'ein Internetbrowser', 'ein Kochbuch' ],
				[ 'ca. 10 Mio. ???', 'ca. 30 Mio. ???', 'ca. 60 Mio. ???', 'ca. 150 Mio. ???' ],
				[ 'ein Messenger', 'ein Onlineshop', 'ein Internetbrowser', 'ein Soziales Netzwerk f??r Gesch??ftskontakte' ],
				[ 'fishy Insta(gram)', 'a fail on Insta(gram)', 'fake Insta(gram)', 'Insta(gram) im Darknet' ],
				[ 'Cristiano Ronaldo', 'Instagram', 'Justin Bieber', 'Kylie Jenner' ],
				[ 'Oktober 2010', 'Januar 2009', 'Dezember 2011', 'August 2008' ],
				[ 'TikTak', 'Musiclaly', 'Tok.Tok', 'Musical.ly' ],
				[ '69', '124', '241', '394' ],
				[ 'Troll', 'Prankster', 'Cyberbully', 'NPC' ],
				[ 'Kids-TV', 'YouKids', 'YouTube Kids', 'Kids on YouTube' ],
				[ 'M??rz 1983', 'Januar 1990', 'September 2001', 'Juni 1996' ],
				[ 'Social Truth', 'The Real Truth', 'Truth Social', 'Trump Social' ],
				[ 'Fake News', 'Fakevid', 'VidPrank', 'Deepfake' ],
				[ 'Eine Person, die st??ndig online ist', 'Ein Programm, das menschliches Verhalten in sozialen Medien simuliert', 'Ein Programm, das alle meine Apps verwalten kann', 'Eine Drohne, die coole Fotos machen kann' ],
				[ 'Telefonnummer', 'Adresse', 'Vor- und Nachmame', 'Gar keine' ],
				[ 'Threema', 'Wire', 'Signal', 'Facebook Messenger' ],
				[ 'Videos von Wutanf??llen auf YouTube', 'L??stereien in Klassenchats', 'Hassnachrichten, die sich gegen bestimmte Menschengruppen richten', 'Falschnachrichten in Online-Foren' ]
			],
			correct_answers: [ 'b', 'c', 'd', 'a', 'd', 'c', 'c', 'a', 'c', 'd', 'c', 'b', 'a', 'd', 'c', 'a', 'c', 'a', 'c', 'd', 'b', 'd', 'd', 'c' ],

			/* das hier sollte man in ruhe lassen */
			number: 0,
			given_answers: [],
			show: true,
			showq: true,
			showb: false,

			a_correct: false,
			b_correct: false,
			c_correct: false,
			d_correct: false,
			a_wrong: false,
			b_wrong: false,
			c_wrong: false,
			d_wrong: false,
			a_cw: false,
			b_cw: false,
			c_cw: false,
			d_cw: false,
			show_next_button: 0,
			correct_banner: false,
			wrong_banner: false,
			vars: [],
			results: [],
			spinner_template: '<div class="atom-spinner atom-scale"><div class="spinner-inner"><div class="spinner-line"></div><div class="spinner-line"></div><div class="spinner-line"></div><!--Chrome renders little circles malformed :(--><div class="spinner-circle">&#9679;</div></div></div>',
			question_order: [],
			bw: false,
			got_seed: "",
			time: 0
		}
	},
	computed: {
		vueWidthProg () {
			return {
				'--percent': 100*(this.number)/(this.question_order.length)+'%'
			}
		}
	}
}
