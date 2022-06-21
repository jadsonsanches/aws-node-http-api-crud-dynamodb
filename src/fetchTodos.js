const AWS = require('aws-sdk')
const { v4 } = require('uuid')

const fetchTodos = async (event) => {

  const dynamodb = new AWS.DynamoDB.DocumentClient();

  let todos;

  try {
    const results = await dynamodb.scan({ TableName: 'TodoTable' }).promise();
    todos = results.Items;

  } catch (error) {
    console.error(error);
  }


  return {
    statusCode: 200,
    body: JSON.stringify(todos),
  };
};

module.exports = {
  handler: fetchTodos,
}