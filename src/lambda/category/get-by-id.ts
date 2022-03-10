import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Message } from '../../helper/message';
import { getCategoryById } from '../../service/category-service';

export const handler = async (
  event: Partial<APIGatewayProxyEvent>
): Promise<APIGatewayProxyResult> => {
  if (event.pathParameters == undefined) {
    return Message.error('UNDEFINED_PATH_PARAMETERS');
  }
  if (event.pathParameters.id == undefined) {
    return Message.error('UNDEFINED_PATH_PARAMETER_ID');
  }

  try {
    const category = await getCategoryById(event.pathParameters.id);
    return Message.success(category);
  } catch (err) {
    return Message.error(err);
  }
};
