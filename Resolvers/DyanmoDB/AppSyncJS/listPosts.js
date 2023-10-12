import { util } from "@aws-appsync/utils";

export function request(ctx) {
  return {
    operation: "Query",
    query: {
      expression: "#PK = :PK and #SK = :SK",
      expressionNames: util.dynamodb.toMapValues({ "#PK": "PK" ,"#SK" : "SK"}),
      expressionValues: util.dynamodb.toMapValues({ ":PK": ctx.args.PK,":SK": ctx.args.SK }),
    },
  };
}
export function response(ctx) {
  if (ctx.error) {
    util.error(ctx.error.message, ctx.error.type);
  }
  return ctx.result.items;
}
