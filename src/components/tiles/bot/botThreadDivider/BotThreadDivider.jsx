/**
 * Renders a divider for separating bot threads with optional styling and interaction.
 * 
 * @param {Object} props - The component's props.
 * @param {string} [props.mode] - The mode or style to apply to the divider (e.g., 'card').
 * @param {string} [props.text] - The text to display inside the divider.
 * @param {function} [props.onClick] - Optional click handler for the divider.
 * 
 * @returns {JSX.Element} The rendered divider component.
 */
export default function BotThreadDivider({ mode, text, onClick, ...props }) {
   return (
      <div className={`bot-divider ${mode}`} onClick={onClick} {...props}>
         <span>{text}</span>
      </div>
   );
}
