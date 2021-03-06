import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Message } from '../../helper/message';
import { createCategory } from '../../service/category-service';

export const handler = async (
  event: Partial<APIGatewayProxyEvent>
): Promise<APIGatewayProxyResult> => {
  if (event.body == undefined) {
    return Message.error('UNDEFINED_EVENT_BODY');
  }

  try {
    const { id, name, description } = JSON.parse(event.body);
    const category = await createCategory({ id, name, description });

    return Message.success(category);
  } catch (err) {
    return Message.error(err);
  }
};
