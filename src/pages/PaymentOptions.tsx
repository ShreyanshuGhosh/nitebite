import React from 'react';
import { Button } from '@/components/ui/button';
import { QRCodeSVG } from 'qrcode.react';

interface PaymentOptionsProps {
  selectedMethod: 'qr' | 'cod';
  onMethodChange: (method: 'qr' | 'cod') => void;
}

const QrPayment: React.FC<{ upiPaymentUrl: string }> = ({ upiPaymentUrl }) => {
  const openUpiApp = () => {
    window.location.href = upiPaymentUrl;
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-medium text-nitebite-highlight mb-4">
        UPI Payment
      </h2>
      <QRCodeSVG value={upiPaymentUrl} size={200} />
      <p className="text-center text-nitebite-text mt-4">
        Scan this QR code with your UPI app to complete your payment.
      </p>
      <button
        onClick={openUpiApp}
        className="mt-6 flex items-center gap-2 border border-transparent hover:border-nitebite-highlight rounded-lg p-2 focus:outline-none"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg"
          alt="UPI Icon"
          className="w-8 h-8"
        />
        <span className="text-nitebite-highlight font-medium">Open UPI App</span>
      </button>
    </div>
  );
};

const CodPayment: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-medium text-nitebite-highlight mb-4">
        Cash on Delivery (COD)
      </h2>
      <p className="text-center text-nitebite-text mt-4">
        You have selected Cash on Delivery. Please prepare the exact amount for payment on delivery.
      </p>
    </div>
  );
};

const PaymentOptions: React.FC<PaymentOptionsProps> = ({ selectedMethod, onMethodChange }) => {
  const upiPaymentInfo = {
    pa: 'merchant@upi',
    pn: 'Merchant Name',
    tn: 'Order Payment'
  };

  const upiPaymentUrl = `upi://pay?pa=${upiPaymentInfo.pa}&pn=${encodeURIComponent(
    upiPaymentInfo.pn
  )}&tn=${encodeURIComponent(upiPaymentInfo.tn)}`;

  return (
    <div className="glassmorphic-card p-4 md:p-6 rounded-2xl mb-8">
      <div className="flex justify-center mb-6 gap-4">
        <Button
          variant={selectedMethod === 'qr' ? 'default' : 'outline'}
          onClick={() => onMethodChange('qr')}
        >
          UPI QR Payment
        </Button>
        <Button
          variant={selectedMethod === 'cod' ? 'default' : 'outline'}
          onClick={() => onMethodChange('cod')}
        >
          Cash on Delivery
        </Button>
      </div>
      {selectedMethod === 'qr' ? (
        <QrPayment upiPaymentUrl={upiPaymentUrl} />
      ) : (
        <CodPayment />
      )}
    </div>
  );
};

export default PaymentOptions;