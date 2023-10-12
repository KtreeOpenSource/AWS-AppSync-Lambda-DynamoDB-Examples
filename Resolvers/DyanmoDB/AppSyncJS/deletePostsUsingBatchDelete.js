import { util } from "@aws-appsync/utils";


/**
 * Deletes items from DynamoDB tables in batches with the provided `PK` and `SK` keys
 * @param {import('@aws-appsync/utils').Context} ctx the context
 * @returns {import('@aws-appsync/utils').DynamoDBBatchDeleteItemRequest} the request
 */
export function request(ctx) {
  return {
    operation: "BatchDeleteItem",
    tables: {
      posts: ctx.args.items.map((item) => util.dynamodb.toMapValues(item)),
    },
  };
}


/**
 * Returns the BatchDeleteItem table results
 * @param {import('@aws-appsync/utils').Context} ctx the context
 * @returns {[*]} the items
 */
export function response(ctx) {
  if (ctx.error) {
    util.error(ctx.error.message, ctx.error.type);
  }
  return ctx.result.data.posts;
}
