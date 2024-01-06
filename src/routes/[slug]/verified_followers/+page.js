export const prerender = false;
export const ssr = true;
import { error, redirect } from '@sveltejs/kit';
/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const { slug } = params;

	if (slug !== '') {
		console.log(slug);

		try {
			const response = await fetch(
				'https://quacker-1fcd875a5802.herokuapp.com/api/listVerifiedFollower/' + slug,
				{
					method: 'GET'
				}
			);
			if (!response.ok) {
				if (response.status === 404) {
					throw new error(404, {
						message: 'Not found'
					});
				} else {
					console.error('Server returned an error:', response.status);
				}
			} else {
				return {
					data: await response.json()
				};
			}
		} catch (error) {
			console.error('Error fetching data:', error);
			throw error; // Propagate the error
		}
	} else {
		throw redirect(307, '/home');
	}
}
