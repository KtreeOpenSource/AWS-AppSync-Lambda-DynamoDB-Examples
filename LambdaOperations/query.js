var AWS = require('aws-sdk');
AWS.config.update({
    region: "ap-south-1"
});
const docClient = new AWS.DynamoDB.DocumentClient();
exports.handler = async (event) => {
    const params = {
        TableName: "posts",
        KeyConditionExpression : 'PK = :PK and SK = :SK',
        ExpressionAttributeValue:{
            ':PK':event.PK,
            ':SK':event.SK
        }
    };
    try{
        const queryRes = await docClient.query(params).promise();
        return queryRes;
    }catch(err){
        return err;
    }
};
