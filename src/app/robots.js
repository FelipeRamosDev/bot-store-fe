export default function robots() {
   return {
      rules: [
         {
            userAgent: 'Googlebot',
            disallow: [ '/dashboard', '/admin' ],
         },
      ],
   };
}
