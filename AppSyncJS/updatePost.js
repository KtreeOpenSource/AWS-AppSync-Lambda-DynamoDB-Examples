import { util } from "@aws-appsync/utils";
export function request(ctx) {
  const {
    args: {
       PK, SK, ...items
    },
  } = ctx;
  items.modifiedTime = util.time.nowEpochSeconds();
 
  const condition = {
    id: { attributeExists: true },
    version: { eq: items.expectedVersion },
  };
  items.expectedVersion += 1;
  return dynamodbUpdateRequest({
    keys: { PK: ctx.args.PK, SK: ctx.args.SK },
    items,
    condition,
  });
}


function dynamodbUpdateRequest(params) {
  const { keys, items } = params;


  const sets = [];
  const removes = [];
  const expressionNames = {};
  const expValues = {};


  // Iterate through the keys of the values
  for (const [key, item] of Object.entries(items)) {
    expressionNames[`#${key}`] = key;
    if (item) {
      sets.push(`#${key} = :${key}`);
      expValues[`:${key}`] = item;
    } else {
      removes.push(`#${key}`);
    }
  }


  let expression = sets.length ? `SET ${sets.join(", ")}` : "";
  expression += removes.length ? ` REMOVE ${removes.join(", ")}` : "";
  return {
    operation: "UpdateItem",
    key: util.dynamodb.toMapValues(keys),
    update: {
      expression,
      expressionNames,
      expressionValues: util.dynamodb.toMapValues(expValues),
    },
  };
}
export function response(ctx) {
  const { result, error } = ctx;
  if (error) {
    util.error(error.message, error.type, result);
  }
  return ctx.result;
}
