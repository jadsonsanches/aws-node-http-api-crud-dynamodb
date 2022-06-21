const AWS = require('aws-sdk')
const { v4 } = require('uuid')

const updateTodo = async (event) => {

  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { id } = event.pathParameters;

  try {
    await dynamodb.delete({
      TableName: 'TodoTable',
      Key: { id }
    }).promise();

  } catch (error) {
    console.log(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Todo deleted successfully'
    }),
  };
};

module.exports = {
  handler: updateTodo,
}