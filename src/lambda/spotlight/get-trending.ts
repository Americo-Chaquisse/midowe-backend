import { APIGatewayProxyResult } from 'aws-lambda';
import { Message } from '../../helper/message';
import { getSpotlightCampaigns } from '../../service/spotlight-service';

export const handler = async (): Promise<APIGatewayProxyResult> => {
  try {
    const campaigns = await getSpotlightCampaigns('trending');
    return Message.success(campaigns);
  } catch (err) {
    return Message.error(err);
  }
};
