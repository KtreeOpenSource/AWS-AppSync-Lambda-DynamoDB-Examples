var AWS = require('aws-sdk');
AWS.config.update({
    region: "ap-south-1"
});
const docClient = new AWS.DynamoDB.DocumentClient();
exports.handler = async (event) => {
    const params = {
        TableName: "posts",
        Key:{
            PK:event.PK,
            SK:event.SK
        },
    };
    try{
        const deleteItemRes = await docClient.delete(params).promise();
        return deleteItemRes;
    }catch(err){
        return err;
    }
};
