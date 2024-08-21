import Link from 'next/link';
import ContentModal from '../base/contentModal/ContentModal';
import ExchangeAPIForm from '@/components/forms/exchangeAPIForm/ExchangeAPIForm.jsx';
import config from '@/config.json';

const HOW_TO_URL = config.links.binanceHowToAPIKey;

export default function ExchangeModal({ open, setOpen }) {
   return <ContentModal
      title="Binance API"
      padding="m"
      size="medium"
      open={open}
      onClose={() => setOpen(false)}
   >
      <p>It's required to link it in order to use the LIVE mode. You will need to generate the API keys on Binance's side. <Link target="_blank" href={HOW_TO_URL}>Check how to generate the API keys here.</Link></p>
      <ExchangeAPIForm onSuccess={() => setOpen(false)} />
   </ContentModal>
}

