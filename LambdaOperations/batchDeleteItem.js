var AWS = require('aws-sdk');
AWS.config.update({
    region: "ap-south-1"
});
const docClient = new AWS.DynamoDB.DocumentClient();
exports.handler = async (event) => {
    let postsArray = [];
    const post1 = {
        DeleteRequest: {
            Key: {
                'PK': 'posts',
                'SK':'postID1'
            }
        }
    };
    postsArray.push(post1);
    const post2 = {
        DeleteRequest: {
            Key: {
                'PK': 'posts',
                'SK':'postID2'
            }
        }
    };
    postsArray.push(post2);
    const params = {
        RequestItems: {
            'posts': postsArray
        }
    };
    try {
        const batchWriteRes = await docClient.batchWrite(params).promise();
        return batchWriteRes;
    }
    catch (err) {
        return err;
    }
};
