import { APIGatewayProxyResult } from 'aws-lambda';
import { Message } from '../../helper/message';
import { getAllCategories } from '../../service/category-service';

export const handler = async (): Promise<APIGatewayProxyResult> => {
  try {
    const categories = await getAllCategories();
    return Message.success(categories);
  } catch (err) {
    return Message.error(err);
  }
};
