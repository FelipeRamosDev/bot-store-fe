export default function BotThreadDivider({ mode, text, onClick, ...props }) {
   return (
      <div className={`bot-divider ${mode}`} onClick={onClick} {...props}>
         <span>{text}</span>
      </div>
   );
}
