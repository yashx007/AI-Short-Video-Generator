/** @type {import("drizzle-kit").Config} */

export default {
    dialect: "postgresql", 
    schema: "./configs/schema.js", 
    dbCredentials: {
      url: "postgresql://ai-interview-mocker_owner:lTvS4Iq8VNwr@ep-long-pine-a5np91gd.us-east-2.aws.neon.tech/AI-Video-Generator?sslmode=require",
    },
  };
  