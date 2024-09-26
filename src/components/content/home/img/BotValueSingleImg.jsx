import BotValueSingle from '@/components/tiles/bot/botValueSingle/BotValueSingle';
import takeprofitDummy from './takeprofitDummy.json';


export default function BotValueSingleImg({ minify }) {
   return <BotValueSingle demoMode={true} botValue={takeprofitDummy} minify={minify} elevation={60} />
}

