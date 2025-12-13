import Flutterwave from 'flutterwave-node-v3';

const flw = new Flutterwave(
  process.env.FLUTTERWAVE_PUBLIC_KEY as string,
  process.env.FLUTTERWAVE_SECRET_KEY as string
);

export type InitiatePaymentPayload = {
  tx_ref: string;
  amount: string;
  currency: string;
  redirect_url: string;
  customer: {
    email: string;
    phonenumber?: string;
    name: string;
  };
  customizations: {
    title: string;
    description?: string;
    logo?: string;
  };
  meta?: Record<string, any>;
};

export const initiatePayment = async (payload: InitiatePaymentPayload) => {
  try {
    const response = await flw.Payment.initiate(payload);
    return response;
  } catch (error) {
    console.error('Flutterwave payment initiation error:', error);
    throw error;
  }
};

export const verifyTransaction = async (transactionId: string) => {
  try {
    const response = await flw.Transaction.verify({ id: transactionId });
    return response;
  } catch (error) {
    console.error('Flutterwave transaction verification error:', error);
    throw error;
  }
};

export default flw;
