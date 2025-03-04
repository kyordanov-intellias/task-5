import * as _ from "lodash";

export const noteValidationSchema = {
  type: "object",
  properties: {
    title: { type: "string", minLength: 1 },
    content: { type: "string", minLength: 1 },
  },
  required: ["title", "content"],
  additionalProperties: false,
};
