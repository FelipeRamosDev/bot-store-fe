import { parseClassName } from '@/helpers/parser';
import Card from '../card/Card';

export default function TexturePaperEllipses({ className = '', padding, radius, elevation = 0, noAnimation, children, ...props }) {
   return (
      <Card className={`texture-paper-ellipses ${parseClassName(className, [ noAnimation ? 'no-animation' : ''])}`} padding={padding} radius={radius} elevation={elevation} {...props}>
         <div className="bg-1"></div>
         <div className="bg-2"></div>
         <div className="bg-3"></div>
         <div className="bg-4"></div>

         <div className="content-wrap">
            {children}
         </div>
      </Card>
   );
}

