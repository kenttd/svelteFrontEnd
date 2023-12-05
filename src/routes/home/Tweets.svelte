<script>
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';
	export let post;
	// Current date and time
	// Current date and time
	const now = new Date();

	// Your specific date and time in the format "YYYY-MM-DD HH:mm:ss"
	const specificDateStr = post.created_at;
	const specificDate = new Date(specificDateStr.replace(/-/g, '/'));

	// Calculate the difference in milliseconds
	const differenceInMilliseconds = specificDate - now;

	// Convert milliseconds to days, hours, and minutes
	const days = Math.floor(Math.abs(differenceInMilliseconds) / (1000 * 60 * 60 * 24));
	const hours = Math.floor(
		(Math.abs(differenceInMilliseconds) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
	);
	const minutes = Math.floor((Math.abs(differenceInMilliseconds) % (1000 * 60 * 60)) / (1000 * 60));

	// Construct the result string based on the time difference
	let result = '';

	if (days > 0) {
		const month = specificDate.toLocaleString('en-US', { month: 'short' });
		const date = specificDate.getDate();
		result += `${month} ${date}`;
	} else if (hours > 0) {
		result += `${hours}h `;
	} else if (minutes > 0 || (days === 0 && hours === 0)) {
		result += `${minutes}m`;
	}

	console.log(result + ', ' + days + minutes + hours);
</script>

<Card.Root class=" mt-5">
	<Card.Header>
		<div class="flex justify-start">
			<Card.Title class="flex align-middle">
				<Avatar.Root class="me-2">
					<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
					<Avatar.Fallback>CN</Avatar.Fallback>
				</Avatar.Root>
				{post.user.Username}
			</Card.Title>
			<Card.Description class="ms-4">{result}</Card.Description>
		</div>
	</Card.Header>
	<Card.Content>
		{post.TweetContent}
	</Card.Content>
	<Card.Footer class="">
		<div class="flex justify-start">
			<div class="flex like">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					class="bi bi-heart mr-2"
					viewBox="0 0 16 16"
				>
					<path
						class="heart"
						d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"
					/>
				</svg>
				<span>{post.LikesCount}</span>
			</div>
			<div class="flex ms-3">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					class="bi bi-arrow-down-up mr-2"
					viewBox="0 0 16 16"
				>
					<path
						fill-rule="evenodd"
						d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5"
					/>
				</svg>
				<span>{post.RetweetsCount}</span>
			</div>
			<div class="flex ms-3">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					class="bi bi-chat mr-2"
					viewBox="0 0 16 16"
				>
					<path
						d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894m-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"
					/>
				</svg>
				<span>{post.RepliesCount}</span>
			</div>
		</div>
	</Card.Footer>
</Card.Root>

<style>
	:global(.heart):hover {
		fill: #ff0000;
	}
	.like:hover {
		/* background-color: rgba(255, 0, 0, 0.431); */
	}
</style>
