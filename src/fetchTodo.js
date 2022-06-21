const AWS = require('aws-sdk')
const { v4 } = require('uuid')

const fetchTodo = async (event) => {

  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

  let todo;

  try {
    const result = await dynamodb.get({
      TableName: 'TodoTable',
      Key: { id }
    }).promise();
    todo = result.Item;

  } catch (error) {
    console.error(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(todo),
  };
};

module.exports = {
  handler: fetchTodo,
}