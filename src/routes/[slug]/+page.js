export const prerender = false;
export const ssr = true;
import { error } from '@sveltejs/kit';


/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	

	if (params.slug != "") {
		try {
			const response = await fetch('https://quacker-1fcd875a5802.herokuapp.com/api/'+params.slug);
		
			if (!response.ok) {
				// Handle non-success status codes here
				if (response.status === 404) {
					throw error(404, {
						message: 'Not found'
					});
				} else {
					console.error('Server returned an error:', response.status);
				}
			} else {
				return {
					data: await response.json(),
				};
			}
		} catch (error) {
			console.error('Error fetching data:', error);
			throw error; // Propagate the error
		}
	}else{
		throw redirect(307, '/home');
    }

}