import Link from 'next/link';
import { useEffect, useState, useContext, useRef } from 'react';
import TopAlertBar from '../../base/topAlertBar/TopAlertBar';
import DBQueryContext from '@/contexts/DBQuery';
import APIContext from '@/contexts/4HandsAPI';
import config from '@/config.json';
import ExchangeModal from '@/components/modals/exchangeModal/ExchangeModal';

const HOW_TO_URL = config.links.binanceHowToAPIKey;
const MESSAGE = `You haven't linked your Binance account yet! It's required to link it in order to use the LIVE mode. You will need to generate the API keys on Binance's side.`;

/**
 * `ExchangeKeysMissingTopbar` is a component that displays a top alert bar when the user hasn't linked their Binance account.
 * It provides a link to instructions for generating Binance API keys and includes a modal for handling the exchange key linking process.
 *
 * @returns {JSX.Element} The rendered `ExchangeKeysMissingTopbar` component.
 */
export default function ExchangeKeysMissingTopbar() {
   const [ control, setControl ] = useState(false);
   const [ excModal, setExcModal ] = useState(false);
   const { doc } = useContext(DBQueryContext);
   const API = useContext(APIContext);
   const isValid = useRef();

   useEffect(() => {
      if (isValid.current) return;

      if (doc?.type === 'master-live') {
         API.ajax.authGet('/user/binance-keys/check-keys').then(checked => {
            if (!checked.isValid) {
               setControl(true);
            } else {
               isValid.current = true;
            }
         }).catch(err => {
            throw err;
         });
      }
   }, [doc, API.ajax]);

   return (
      <>
         <TopAlertBar
            show={control}
            actionLabel="Link"
            action={() => setExcModal(true)}
            close={() => setControl(false)}
         >
            {MESSAGE} <Link target="_blank" href={HOW_TO_URL}>Check how to generate the API keys here.</Link>
         </TopAlertBar>

         <ExchangeModal open={excModal} setOpen={setExcModal} />
      </>
   );
}
