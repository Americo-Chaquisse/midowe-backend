import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Message } from '../../helper/message';
import { getDonationById } from '../../service/donation-service';

export const handler = async (
  event: Partial<APIGatewayProxyEvent>
): Promise<APIGatewayProxyResult> => {
  if (event.pathParameters == undefined) {
    return Message.error('UNDEFINED_PATH_PARAMETERS');
  }
  if (event.pathParameters.campaignId == undefined) {
    return Message.error('UNDEFINED_PATH_PARAMETER_CAMPAIGN_ID');
  }
  if (event.pathParameters.transactionId == undefined) {
    return Message.error('UNDEFINED_PATH_PARAMETER_TRANSACTION_ID');
  }

  try {
    const donation = await getDonationById(
      event.pathParameters.campaignId,
      event.pathParameters.transactionId
    );
    return Message.success(donation);
  } catch (err) {
    return Message.error(err);
  }
};
