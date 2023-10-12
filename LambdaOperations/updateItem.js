var AWS = require('aws-sdk');
AWS.config.update({
    region: "ap-south-1"
});
const docClient = new AWS.DynamoDB.DocumentClient();
exports.handler = async (event) => {
    const currentTime = Math.round(Date.now()/1000);
    const params = {
        TableName: "posts",
        Key:{
            PK:event.PK,
            SK:event.SK
        },
        updateExpression: 'SET title = :title, description = :description, updatedTime = :updatedTime',
        ExpressionAttributeValue :{
            ':title':event.title,
            ':description':event.description,
            ':updatedTime':currentTime
        },
    };
    try{
        const updateItemRes = await docClient.update(params).promise();
        return updateItemRes;
    }catch(err){
        return err;
    }
};
