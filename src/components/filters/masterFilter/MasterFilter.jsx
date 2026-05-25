import Card from '@/components/common/card/Card';
import DBQueryContext from '@/contexts/DBQuery';
import { LoadingButton } from '@mui/lab';
import React, { useContext } from 'react';

export default function MasterFilter() {
   const { filter, setFilter, isLoading } = useContext(DBQueryContext);

   const handleClick = () => {
      if (filter.state === 'active') {
         setFilter({ state: 'archived' });
      }
      
      if (filter.state === 'archived') {
         setFilter({ state: 'active' });
      }
   }

   return (
      <Card className="master-filter" padding="s" radius="m">
         <LoadingButton
            color="warn"
            variant={filter.state === 'archived' ? 'contained' : undefined}
            onClick={handleClick}
            loading={isLoading}
         >Show {filter.state === 'archived' ? 'active' : 'archived'}</LoadingButton>
      </Card>
   );
};
