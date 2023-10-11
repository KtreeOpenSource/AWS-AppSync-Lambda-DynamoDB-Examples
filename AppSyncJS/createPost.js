import { util } from "@aws-appsync/utils";


/**
 * Puts an item into the DynamoDB table using an auto-generated ID.
 * @param {import('@aws-appsync/utils').Context} ctx the context
 * @returns {import('@aws-appsync/utils').DynamoDBPutItemRequest} the request
 */
ctx.args.createdTime = util.time.nowEpochSeconds()
export function request(ctx) {
  return {
    operation: "PutItem",
    key: util.dynamodb.toMapValues({ PK: util.autoId() ,SK : `posts#${ctx.args.postStatus}` }),
    attributeValues: util.dynamodb.toMapValues(ctx.args),
  };
}


/**
 * Returns the item or throws an error if the operation failed
 * @param {import('@aws-appsync/utils').Context} ctx the context
 * @returns {*} the inserted item
 */
export function response(ctx) {
  if (ctx.error) {
    util.error(ctx.error.message, ctx.error.type);
  }
  return ctx.result;
}
