import Card from '../card/Card';

export default function TexturePaperEllipses({ className = '', padding, radius, children, ...props }) {
   return (
      <Card className={`texture-paper-ellipses ${className}`} padding={padding} radius={radius} elevation={0} {...props}>
         {children}

         <div className="bg-1"></div>
         <div className="bg-2"></div>
         <div className="bg-3"></div>
         <div className="bg-4"></div>
      </Card>
   );
}

