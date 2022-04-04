import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Message } from '../../helper/message';
import {
  createDonation,
  CreateDonationParams,
} from '../../service/donation-service';
import { billMpesaCustomer } from '../../integration/mpesa-integration';

export const handler = async (
  event: Partial<APIGatewayProxyEvent>
): Promise<APIGatewayProxyResult> => {
  if (event.body == undefined) {
    return Message.error('UNDEFINED_EVENT_BODY');
  }

  try {
    const {
      categoryId,
      campaignId,
      transactionId,
      userName,
      userEmail,
      userPhone,
      amount,
    } = JSON.parse(event.body);

    const billResponse = await billMpesaCustomer(
      transactionId,
      userPhone,
      amount
    );

    if (billResponse.responseCode === 'INS-0') {
      const params: CreateDonationParams = {
        categoryId,
        campaignId,
        transactionId,
        userName,
        userEmail,
        userPhone,
        amount,
        conversationId: billResponse.conversationId,
        responseCode: billResponse.responseCode,
      };
      await createDonation(params);
    }

    return Message.success(billResponse);
  } catch (err) {
    return Message.error(err);
  }
};
