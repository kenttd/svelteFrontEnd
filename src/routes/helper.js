import { Toaster, toast } from 'svelte-sonner';

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

export async function doRetweet(tweetID, update, RetweetID) {
	// console.log(tweetID, update, LikeID);
	const formData = new FormData();
	formData.append('UserID', getCookie('uid'));
	formData.append('TweetID', tweetID);
	formData.append('update', update);
	formData.append('RetweetID', RetweetID);

	try {
		const response = await fetch('https://quacker-1fcd875a5802.herokuapp.com/api/doRetweet', {
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

export async function doUnRetweet(TweetID, RetweetID) {
	const formData = new FormData();
	formData.append('UserID', getCookie('uid'));
	formData.append('TweetID', TweetID);
	formData.append('RetweetID', RetweetID);
	try {
		const response = await fetch('https://quacker-1fcd875a5802.herokuapp.com/api/doUnRetweet', {
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
	deleteCookie('isStaff');
	deleteCookie('isVerified');
	location.reload();
}

export async function doFollow(FollowerID, FollowingID) {
	const formData = new FormData();
	formData.append('FollowerID', FollowerID);
	formData.append('FollowingID', FollowingID);
	try {
		const response = await fetch('https://quacker-1fcd875a5802.herokuapp.com/api/doFollow', {
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

export async function doUnFollow(FollowerID, FollowingID) {
	const formData = new FormData();
	formData.append('FollowerID', FollowerID);
	formData.append('FollowingID', FollowingID);
	try {
		const response = await fetch('https://quacker-1fcd875a5802.herokuapp.com/api/doUnfollow', {
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

export async function doVerify(UserID) {
	const formData = new FormData();
	formData.append('UserID', UserID);
	try {
		const response = await fetch('https://quacker-1fcd875a5802.herokuapp.com/api/doVerify', {
			method: 'POST',
			body: formData
		});
		if (response.ok) {
			const jsonData = await response.json();
			toast.success('Successfully verified this user.');

			return jsonData;
		} else {
			console.error('Error:', response.statusText);
		}
	} catch (error) {
		console.error('Error:', error);
	}
}
export async function doUnverify(UserID) {
	const formData = new FormData();
	formData.append('UserID', UserID);
	try {
		const response = await fetch('https://quacker-1fcd875a5802.herokuapp.com/api/doUnverify', {
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
export async function doStaff(UserID) {
	const formData = new FormData();
	formData.append('UserID', UserID);
	try {
		const response = await fetch('https://quacker-1fcd875a5802.herokuapp.com/api/doStaff', {
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
export async function doUnstaff(UserID) {
	const formData = new FormData();
	formData.append('UserID', UserID);
	try {
		const response = await fetch('https://quacker-1fcd875a5802.herokuapp.com/api/doUnstaff', {
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
export async function doBan(UserID) {
	const formData = new FormData();
	formData.append('UserID', UserID);
	try {
		const response = await fetch('https://quacker-1fcd875a5802.herokuapp.com/api/doBan', {
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
export async function doUnban(UserID) {
	const formData = new FormData();
	formData.append('UserID', UserID);
	try {
		const response = await fetch('https://quacker-1fcd875a5802.herokuapp.com/api/doUnban', {
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
export async function editProfile(UserID, Bio, link) {
	const formData = new FormData();
	formData.append('UserID', UserID);
	formData.append('Bio', Bio);
	formData.append('link', link);
	try {
		const response = await fetch('https://quacker-1fcd875a5802.herokuapp.com/api/editProfile', {
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
	location.reload();
}
export function isLoggedin() {
	if (getCookie('uid') == '') {
		window.location.href = '/';
	}
}

export function formatTime(inputTime) {
	const date = new Date(inputTime);
	if (isNaN(date.getTime())) {
		return inputTime;
	}
	const year = date.getFullYear();
	const monthNames = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];
	const month = monthNames[date.getMonth()];
	const day = date.getDate();
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const time = hours + ':' + (minutes < 10 ? '0' : '') + minutes;
	return month + ', ' + day + ' ' + year + ' ' + time;
}
