var AWS = require('aws-sdk');
AWS.config.update({
    region: "ap-south-1"
});
const docClient = new AWS.DynamoDB.DocumentClient();
const uuid = require("uuid");
exports.handler = async (event) => {
    const postID = uuid();
    const currentTime = Math.round(Date.now()/1000);
    const params = {
        TableName: "posts",
        Item: {
            PK: "posts",
            SK: postID,
            title: "Post title",
            description: "Post Description",
            createdTime: currentTime,
            updatedTime: currentTime
        }
    };
    try{
        const createItemRes = await docClient.put(params).promise();
        return createItemRes;
    }catch(err){
        return err;
    }
};
