import React, { useEffect } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

const YourComponent = () => {
    useEffect(() => {
      initMercadoPago('MP_KEY', { locale: 'pt-BR' });
    }, []);

    return (
      <div>
        <Wallet initialization={{preferenceId: '<PREFERENCE_ID>'}} />
      </div>
    );
};

export default YourComponent;