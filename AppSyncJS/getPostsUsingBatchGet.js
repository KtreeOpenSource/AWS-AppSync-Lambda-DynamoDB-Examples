import { util } from '@aws-appsync/utils';
export function request(ctx) {
    let ids = []
    for (const post of ctx.args.posts) {
        let obj = {
            PK: post.PK,
            SK: post.SK,
        }
        let mapValue = util.dynamodb.toMapValues(obj)
        ids.push(mapValue)
    }
    return {
        operation: 'BatchGetItem',
        tables: {
            posts: {
                keys: ids,
                consistentRead: false
            }
        },
    }
}
export function response(ctx) {
    if (ctx.error) {
        util.error(ctx.error.message, ctx.error.type);
    }
    return ctx.result.data.posts;
}
