import { SpotType } from './../../helper/types';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Message } from '../../helper/message';
import { createSpotlightCampaign } from '../../service/spotlight-service';

export const handler = async (
  event: Partial<APIGatewayProxyEvent>
): Promise<APIGatewayProxyResult> => {
  if (event.pathParameters == undefined) {
    return Message.error('UNDEFINED_PATH_PARAMETERS');
  }
  if (event.pathParameters.spotType == undefined) {
    return Message.error('UNDEFINED_PATH_PARAMETER_SPOT_TYPE');
  }
  if (event.pathParameters.categoryId == undefined) {
    return Message.error('UNDEFINED_PATH_PARAMETER_CATEGORY_ID');
  }
  if (event.pathParameters.campaignId == undefined) {
    return Message.error('UNDEFINED_PATH_PARAMETER_CAMPAIGN_ID');
  }

  try {
    const spotlight = await createSpotlightCampaign(
      event.pathParameters.spotType as SpotType,
      event.pathParameters.categoryId,
      event.pathParameters.campaignId
    );
    return Message.success(spotlight);
  } catch (err) {
    return Message.error(err);
  }
};
