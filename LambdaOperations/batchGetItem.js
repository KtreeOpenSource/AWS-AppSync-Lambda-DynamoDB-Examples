var AWS = require('aws-sdk');
AWS.config.update({
    region: "ap-south-1"
});
const docClient = new AWS.DynamoDB.DocumentClient();
exports.handler = async (event) => {
    const params = {
        RequestItems: {
            "posts": {
                Keys: [
                    {
                        PK:"posts",
                        SK:"postID1"
                    },
                    {   
                        PK:"posts",
                        SK:"postID2"
                    }
                ],
            }
        },
    };
    try {
        const batchGetRes = await docClient.batchGet(params).promise();
        return batchGetRes.Responses.posts;
    }
    catch (err) {
        return err;
    }
};
