import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Message } from '../../helper/message';
import {
  createCampaign,
  CreateCampaignParams,
} from '../../service/campaign-service';

export const handler = async (
  event: Partial<APIGatewayProxyEvent>
): Promise<APIGatewayProxyResult> => {
  if (event.body == undefined) {
    return Message.error('UNDEFINED_EVENT_BODY');
  }

  try {
    const {
      categoryId,
      title,
      description,
      profileImage,
      additionalImages,
      targetAmount,
      targetDate,
    } = JSON.parse(event.body);

    const params: CreateCampaignParams = {
      categoryId,
      userId: 'achaquisse1@gmail.com',
      userData: {
        fullName: 'Américo Tinga Chaquisse',
        pictureUrl:
          'https://i1.sndcdn.com/avatars-eihxIuzFW0OqgZjj-yVE8uQ-t240x240.jpg',
      },
      title,
      description,
      profileImage,
      additionalImages,
      targetAmount: parseFloat(targetAmount),
      targetDate,
    };

    const campaign = await createCampaign(params);
    return Message.success(campaign);
  } catch (err) {
    return Message.error(err);
  }
};
