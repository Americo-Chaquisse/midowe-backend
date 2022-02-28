import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Message } from '../helper/message';
import { Categories } from '../repository/schema';

export const handler = async (
  event: Partial<APIGatewayProxyEvent>
): Promise<APIGatewayProxyResult> => {
  if (event.pathParameters == undefined) {
    return Message.error('UNDEFINED_PATH_PARAMETERS');
  }

  const category = await Categories.get({ id: event.pathParameters.id });
  if (category == undefined) {
    return Message.error(`Not found category.id: ${event.pathParameters.id}`);
  }

  try {
    return Message.success(category);
  } catch (err) {
    return Message.error(err);
  }
};
