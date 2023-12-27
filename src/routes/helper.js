export function test() {
	return 'hey';
}
export function getCookie(cname) {
	let name = cname + '=';
	let ca = document.cookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return '';
}
export function deleteCookie(cname) {
	const d = new Date();
	d.setTime(d.getTime() - 3600);
	let expires = 'expires=' + d.toUTCString();
	document.cookie = cname + '=;' + expires + ';path=/';
}

export async function doLike(tweetID, update, LikeID) {
	// console.log(tweetID, update, LikeID);
	const formData = new FormData();
	formData.append('UserID', getCookie('uid'));
	formData.append('TweetID', tweetID);
	formData.append('update', update);
	formData.append('LikeID', LikeID);

	try {
		const response = await fetch('https://quacker-1fcd875a5802.herokuapp.com/api/doLike', {
			method: 'POST',
			body: formData
		});
		if (response.ok) {
			const jsonData = await response.json();
			return jsonData;
		} else {
			console.error('Error:', response.statusText);
		}
	} catch (error) {
		console.error('Error:', error);
	}
}

export async function doUnLike(TweetID, LikeID) {
	const formData = new FormData();
	formData.append('UserID', getCookie('uid'));
	formData.append('TweetID', TweetID);
	formData.append('LikeID', LikeID);
	try {
		const response = await fetch('https://quacker-1fcd875a5802.herokuapp.com/api/doUnLike', {
			method: 'POST',
			body: formData
		});
		if (response.ok) {
			const jsonData = await response.json();
			return jsonData.LikeID;
		} else {
			console.error('Error:', response.statusText);
		}
	} catch (error) {
		console.error('Error:', error);
	}
}

export async function addToBookmark(TweetID) {
	const formData = new FormData();
	formData.append('UserID', getCookie('uid'));
	formData.append('TweetID', TweetID);
	try {
		const response = await fetch('https://quacker-1fcd875a5802.herokuapp.com/api/doBookmark', {
			method: 'POST',
			body: formData
		});
		if (response.ok) {
			const jsonData = await response.json();
			return jsonData;
		} else {
			console.error('Error:', response.statusText);
		}
	} catch (error) {
		console.error('Error:', error);
	}
}

export async function removeFromBookmark(BookmarkID) {
	const formData = new FormData();
	formData.append('UserID', getCookie('uid'));
	formData.append('BookmarkID', BookmarkID);
	try {
		const response = await fetch('https://quacker-1fcd875a5802.herokuapp.com/api/doUnBookmark', {
			method: 'POST',
			body: formData
		});
		if (response.ok) {
			const jsonData = await response.json();
			return jsonData;
		} else {
			console.error('Error:', response.statusText);
		}
	} catch (error) {
		console.error('Error:', error);
	}
}

export function logout() {
	deleteCookie('uid');
	deleteCookie('username');
	location.reload();
}
