import Rule from '@/components/tiles/bot/rule/Rule';
import ruleDummy from './ruleDummy.json';

export default function RuleTileImg() {
   return <Rule demoMode={true} elevation={50} rule={ruleDummy} />;
}
