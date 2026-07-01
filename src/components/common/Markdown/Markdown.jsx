import { parseCSS } from '@/helpers/parser';
import styles from './Markdown.module.scss';
import { marked } from 'marked';
import { forwardRef } from 'react';

const Markdown = forwardRef(function Markdown({ className, value, ...props }, ref) {
   const htmlValue = marked(value || '');
   const CSS = parseCSS(className, [
      'Markdown',
      styles.Markdown,
   ]);
   
   return (
      <div
         ref={ref}
         className={CSS}
         dangerouslySetInnerHTML={{ __html: htmlValue }}
         {...props}
      ></div>
   );
});

export default Markdown;
