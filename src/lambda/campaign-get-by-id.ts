import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Message } from '../helper/message';
import { Campaigns } from '../repository/schema';

export const handler = async (
  event: Partial<APIGatewayProxyEvent>
): Promise<APIGatewayProxyResult> => {
  if (event.pathParameters == undefined) {
    return Message.error('UNDEFINED_PATH_PARAMETERS');
  }

  const campaign = await Campaigns.get({
    campaignId: event.pathParameters.campaignId,
  });
  if (campaign == undefined) {
    return Message.error(
      `Not found campaign.id: ${event.pathParameters.campaignId}`
    );
  }

  try {
    return Message.success(campaign);
  } catch (err) {
    return Message.error(err);
  }
};
