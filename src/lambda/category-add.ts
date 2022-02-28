import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Message } from '../helper/message';
import { Categories } from '../repository/schema';

export const handler = async (
  event: Partial<APIGatewayProxyEvent>
): Promise<APIGatewayProxyResult> => {
  if (event.body == undefined) {
    return Message.error('UNDEFINED_EVENT_BODY');
  }

  const requestBody = JSON.parse(event.body);

  const category = await Categories.create({
    id: requestBody.id,
    name: requestBody.name,
    description: requestBody.description,
  });

  try {
    return Message.success(category);
  } catch (err) {
    return Message.error(err);
  }
};
