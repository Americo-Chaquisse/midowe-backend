import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Message } from '../../helper/message';
import { createCampaign } from '../../service/campaign-service';

export const handler = async (
  event: Partial<APIGatewayProxyEvent>
): Promise<APIGatewayProxyResult> => {
  if (event.body == undefined) {
    return Message.error('UNDEFINED_EVENT_BODY');
  }

  try {
    const requestBody = JSON.parse(event.body);

    const campaign = await createCampaign(
      requestBody.categoryId,
      requestBody.userId,
      {
        fullName: 'Américo Tinga Chaquisse',
        pictureUrl:
          'https://i1.sndcdn.com/avatars-eihxIuzFW0OqgZjj-yVE8uQ-t240x240.jpg',
      },
      requestBody.title,
      requestBody.description,
      requestBody.profileImage,
      requestBody.additionalImages,
      parseFloat(requestBody.targetAmount),
      requestBody.targetDate
    );
    return Message.success(campaign);
  } catch (err) {
    return Message.error(err);
  }
};
