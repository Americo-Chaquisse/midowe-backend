export class Message {
  static success(data: object, statusCode?: number) {
    return {
      statusCode: statusCode == undefined ? 200 : statusCode,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };
  }

  static error(message: string | object | unknown, statusCode?: number) {
    console.error(message);
    return {
      statusCode: statusCode == undefined ? 400 : statusCode,
      body: JSON.stringify({ message: message }),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };
  }
}
