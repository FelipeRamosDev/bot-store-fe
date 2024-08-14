import ContentModal from '../base/contentModal/ContentModal';
import ExchangeAPIForm from '@/components/forms/exchangeAPIForm/ExchangeAPIForm.jsx';

export default function ExchangeModal({ open, setOpen }) {
   return <ContentModal
      title="Binance API"
      padding="m"
      size="medium"
      open={open}
      onClose={() => setOpen(false)}
   >
      <ExchangeAPIForm onSuccess={() => setOpen(false)} />
   </ContentModal>
}

