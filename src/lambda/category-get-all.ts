import { APIGatewayProxyResult } from 'aws-lambda';
import { Message } from '../helper/message';
import { Categories } from '../repository/schema';

export const handler = async (): Promise<APIGatewayProxyResult> => {
  const categories = await Categories.scan();

  try {
    return Message.success(categories);
  } catch (err) {
    return Message.error(err);
  }
};
