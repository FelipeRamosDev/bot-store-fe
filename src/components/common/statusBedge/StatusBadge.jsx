import './StatusBadge.scss';

export default function StatusBadge({ className = '', color = 'disabled', children }) {
   return <span className={`${className} status-badge`} color={color}>{children}</span>
}
