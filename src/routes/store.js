import { writable } from 'svelte/store';
import { parse, serialize } from 'cookie';

export const cookieStore = writable({
    read: (name, options) => {
        const cookies = parse(document.cookie);
        return cookies[name];
    },
    write: (name, value, options) => {
        document.cookie = serialize(name, value, options);
    },
    delete: (name, options) => {
        document.cookie = serialize(name, '', { ...options, maxAge: -1 });
    }
});

  
// export const getCookie = writable({
//     getCookie: () => {
//         const cookies = document.cookie.split(';');
//         for (let i = 0; i < cookies.length; i++) {
//             const cookie = cookies[i].trim();
//             if (cookie.startsWith(name + '=')) {
//                 return cookie.substring(name.length + 1);
//             }
//         }
//         return null;
//     }
//   });