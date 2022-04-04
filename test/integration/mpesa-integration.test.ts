import { billMpesaCustomer } from '../../src/integration/mpesa-integration';

describe('Test Mpesa integration', () => {
  // Skipping. To be used when mpesa credentials are provided, and a real phone
  it.skip(
    'should bill mpesa customer',
    async () => {
      jest.setTimeout(60 * 1000);

      const randomId = new Date().getMilliseconds();
      const transactionId = `TR${randomId}`;
      const userPhone = 842058817;
      const amount = 10;

      const response = await billMpesaCustomer(
        transactionId,
        userPhone,
        amount
      );

      expect(response).toBeTruthy();
      expect(response.responseCode).toBe('INS-0');
      expect(response.responseDesc).toBe('Request processed successfully');
      expect(response.transactionId).toBe(transactionId);
    },
    60 * 1000
  );
});
