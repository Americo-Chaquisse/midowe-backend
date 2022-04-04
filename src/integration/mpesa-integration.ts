import 'dotenv/config';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Transaction = require('mpesa-mz-nodejs-lib');

const mpesaConfig = {
  public_key: process.env.MPESA_PUBLIC_KEY,
  api_host: process.env.MPESA_API_HOST,
  api_key: process.env.MPESA_API_KEY,
  origin: process.env.MPESA_ORIGIN,
  service_provider_code: process.env.MPESA_SERVICE_PROVIDER_CODE,
  initiator_identifier: process.env.MPESA_INITIATOR_IDENTIFIER,
  security_credential: process.env.MPESA_SECURITY_CREDENTIALS,
};

type BillResponse = {
  responseCode: string;
  responseDesc: string;
  conversationId: string;
  transactionId: string;
  persisted?: boolean;
};

async function billMpesaCustomer(
  transactionId: string,
  userPhone: number,
  amount: number
): Promise<BillResponse> {
  if (process.env.SKIP_MPESA_BILL && process.env.SKIP_MPESA_BILL === 'true') {
    return {
      responseCode: 'INS-0',
      responseDesc: '',
      conversationId: '',
      transactionId: '',
    };
  }

  const transaction = new Transaction(mpesaConfig);

  const mpesaResponse = await transaction.c2b({
    reference: transactionId,
    msisdn: `${userPhone}`,
    amount: amount,
    third_party_reference: transactionId,
  });

  return {
    responseCode: mpesaResponse.output_ResponseCode,
    responseDesc: mpesaResponse.output_ResponseDesc,
    conversationId: mpesaResponse.output_ConversationID,
    transactionId: mpesaResponse.output_ThirdPartyReference,
  };
}

export { BillResponse, billMpesaCustomer };
