import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Message } from '../helper/message';
import { getCampaignById } from '../service/campaign-service';

export const handler = async (
  event: Partial<APIGatewayProxyEvent>
): Promise<APIGatewayProxyResult> => {
  if (event.pathParameters == undefined) {
    return Message.error('UNDEFINED_PATH_PARAMETERS');
  }
  if (event.pathParameters.categoryId == undefined) {
    return Message.error('UNDEFINED_PATH_PARAMETER_CATEGORY_ID');
  }

  if (event.pathParameters.campaignId == undefined) {
    return Message.error('UNDEFINED_PATH_PARAMETER_CAMPAIGN_ID');
  }

  try {
    const campaign = await getCampaignById(
      event.pathParameters.categoryId,
      event.pathParameters.campaignId
    );
    return Message.success(campaign);
  } catch (err) {
    return Message.error(err);
  }
};
