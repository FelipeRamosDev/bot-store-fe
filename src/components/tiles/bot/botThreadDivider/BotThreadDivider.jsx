export default function BotThreadDivider({ mode, text }) {
   return (
      <div className={`bot-divider ${mode}`}>
         <span>{text}</span>
      </div>
   );
}
