export function parseClassName(classNameBase, classesToAppend = []) {
   const result = [ ...classesToAppend ];

   if (classNameBase) {
      result.unshift(classNameBase);
   }

   return result.join(' ');
}
