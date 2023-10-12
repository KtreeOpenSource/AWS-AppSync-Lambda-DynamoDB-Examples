var AWS = require('aws-sdk');
AWS.config.update({
    region: "ap-south-1"
});
const docClient = new AWS.DynamoDB.DocumentClient();
exports.handler = async (event) => {
    let postsArray = [];
    const currentTime = Math.round(Date.now()/1000);
    const post1 = {
        PutRequest: {
            Item: {
                'PK': 'posts',
                'SK':'postID1',
                'title':'title 1',
                'description':'description 1',
                'createdTime':currentTime,
                'updatedTime':currentTime
            }
        }
    };
    postsArray.push(post1);
    const post2 = {
        PutRequest: {
            Key: {
                'PK': 'posts',
                'SK':'postID2',
                'title':'title 2',
                'description':'description 2',
                'createdTime':currentTime,
                'updatedTime':currentTime
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
