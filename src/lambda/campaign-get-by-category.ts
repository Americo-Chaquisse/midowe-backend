import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Message } from '../helper/message';
import { getCampaignsByCategory } from '../service/campaign-service';

export const handler = async (
  event: Partial<APIGatewayProxyEvent>
): Promise<APIGatewayProxyResult> => {
  if (event.pathParameters == undefined) {
    return Message.error('UNDEFINED_PATH_PARAMETERS');
  }
  if (event.pathParameters.categoryId == undefined) {
    return Message.error('UNDEFINED_PATH_PARAMETER_CATEGORY_ID');
  }
  if (event.queryStringParameters == undefined) {
    return Message.error('UNDEFINED_QUERY_STRING_PARAMETERS');
  }

  try {
    const campaigns = await getCampaignsByCategory(
      event.pathParameters.categoryId,
      event.queryStringParameters.limit == undefined
        ? 10
        : parseInt(event.queryStringParameters.limit),
      event.queryStringParameters.lastCampaignId == undefined ||
        event.queryStringParameters.lastCampaignId === ''
        ? undefined
        : event.queryStringParameters.lastCampaignId
    );
    return Message.success(campaigns);
  } catch (err) {
    return Message.error(err);
  }
};
