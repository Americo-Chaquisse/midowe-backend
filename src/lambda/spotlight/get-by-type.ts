import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Message } from '../../helper/message';
import {
  getSpotlightCampaigns,
  SpotType,
} from '../../service/spotlight-service';

export const handler = async (
  event: Partial<APIGatewayProxyEvent>
): Promise<APIGatewayProxyResult> => {
  try {
    if (event.pathParameters == undefined) {
      return Message.error('UNDEFINED_PATH_PARAMETERS');
    }
    if (event.pathParameters.spotType == undefined) {
      return Message.error('UNDEFINED_PATH_PARAMETER_SPOT_TYPE');
    }

    const campaigns = await getSpotlightCampaigns(
      event.pathParameters.spotType as SpotType
    );
    return Message.success(campaigns);
  } catch (err) {
    return Message.error(err);
  }
};
