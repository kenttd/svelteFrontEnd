<script>
	function setCookie(cname, cvalue, exdays) {
		const d = new Date();
		d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
		let expires = 'expires=' + d.toUTCString();
		document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
		console.log('test');
	}
	function deleteCookie(cname) {
		const d = new Date();
		d.setTime(d.getTime() - 3600);
		let expires = 'expires=' + d.toUTCString();
		document.cookie = cname + '=;' + expires + ';path=/';
	}
	function getCookie(cname) {
		console.log('masuk');
		let name = cname + '=';
		let decodedCookie = decodeURIComponent(document.cookie);
		let ca = decodedCookie.split(';');
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			console.log(c.indexOf(name));
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return '';
	}

	function test(cname) {
		console.log(getCookie(cname));
		// console.log(document.cookie.includes(cname));
		console.log(getCookie(cname) === null || getCookie(cname) === '');
		console.log(document.cookie);
	}
</script>

<button on:click={() => setCookie('name', 'kent', 24)}>Create cookie</button>
<button on:click={() => deleteCookie('name')}>Delete cookie</button>
<button on:click={() => test('name')}>Read Cookie</button>
