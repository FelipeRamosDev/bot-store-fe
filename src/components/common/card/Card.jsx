import './Card.scss';

export default function Card({ padding = 'm', radius = 'm', elevation = 20, shadowColor = '#111111DD', children }) {
   return <div
      className={`card p-${padding} r-${radius}`}
      style={{
         boxShadow: elevation ? `0 0 ${elevation}px ${shadowColor}` : 'none'
      }}
   >
      {children}
   </div>;
}
