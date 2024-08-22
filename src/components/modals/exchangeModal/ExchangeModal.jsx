import Link from 'next/link';
import ContentModal from '../base/contentModal/ContentModal';
import ExchangeAPIForm from '@/components/forms/exchangeAPIForm/ExchangeAPIForm.jsx';
import config from '@/config.json';

const HOW_TO_URL = config.links.binanceHowToAPIKey;
const MESSAGE = `It's required to link it in order to use the LIVE mode. You will need to generate the API keys on Binance's side.`;

/**
 * A modal for managing Binance API integration.
 *
 * @param {Object} props - The properties to customize the Binance API modal.
 * @param {boolean} [props.open=false] - Controls whether the modal is open or closed.
 * @param {function} [props.setOpen=() => {}] - Function to control the modal's open state.
 *
 * @returns {React.Element} The rendered modal for Binance API integration.
 */
export default function ExchangeModal({ open = false, setOpen = () => {} }) {
   return (
      <ContentModal
         title="Binance API"
         padding="m"
         size="medium"
         open={open}
         onClose={() => setOpen(false)}
      >
         <p>
            {MESSAGE}{' '}
            <Link target="_blank" href={HOW_TO_URL}>
               Check how to generate the API keys here.
            </Link>
         </p>
         <ExchangeAPIForm onSuccess={() => setOpen(false)} />
      </ContentModal>
   );
}
