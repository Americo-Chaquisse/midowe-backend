import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Message } from '../../helper/message';
import { getDonationsByCampaign } from '../../service/donation-service';

export const handler = async (
  event: Partial<APIGatewayProxyEvent>
): Promise<APIGatewayProxyResult> => {
  if (event.pathParameters == undefined) {
    return Message.error('UNDEFINED_PATH_PARAMETERS');
  }
  if (event.pathParameters.campaignId == undefined) {
    return Message.error('UNDEFINED_PATH_PARAMETER_CAMPAIGN_ID');
  }
  if (event.queryStringParameters == undefined) {
    return Message.error('UNDEFINED_QUERY_STRING_PARAMETERS');
  }

  try {
    const donations = await getDonationsByCampaign(
      event.pathParameters.campaignId,
      event.queryStringParameters.limit == undefined
        ? 10
        : parseInt(event.queryStringParameters.limit),
      event.queryStringParameters.lastTransactionId == undefined ||
        event.queryStringParameters.lastTransactionId === ''
        ? undefined
        : event.queryStringParameters.lastTransactionId
    );
    return Message.success(donations);
  } catch (err) {
    return Message.error(err);
  }
};
