const AWS = require('aws-sdk')
const { v4 } = require('uuid')

const updateTodo = async (event) => {

  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { complete } = JSON.parse(event.body);
  const { id } = event.pathParameters;

  try {
    await dynamodb.update({
      TableName: 'TodoTable',
      Key: { id },
      UpdateExpression: 'set complete = :complete',
      ExpressionAttributeValues: {
        ':complete': complete
      },
      ReturnValues: 'ALL_NEW'
    }).promise();

  } catch (error) {
    console.log(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Todo updated successfully'
    }),
  };
};

module.exports = {
  handler: updateTodo,
}