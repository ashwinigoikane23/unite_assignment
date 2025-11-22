import AWS from "aws-sdk";
import Twilio from "twilio";
import { CallTask } from "../models/calltask.model";

const sns = new AWS.SNS({ region: process.env.AWS_REGION || "us-east-1" });
const twClient = Twilio(
  process.env.TWILIO_SID || "",
  process.env.TWILIO_AUTH || ""
);

export const notifier = {
  async notifyAssignment(task: any) {
    try {
      const msg = `Task assigned: ${task._id}`;
      if (process.env.SNS_TOPIC_ARN) {
        await sns
          .publish({ Message: msg, TopicArn: process.env.SNS_TOPIC_ARN })
          .promise();
      }
    } catch (e) {
      const errMsg = e instanceof Error ? e.message : String(e);
      console.error("SNS publish failed", errMsg);
    }
    try {
    } catch (e) {
      const errMsg = e instanceof Error ? e.message : String(e);
      console.error("Twilio send failed", errMsg);
    }
  },
  async notifyCompletion(task: { _id: string; outcome?: string }) {
    try {
      const msg = `Task completed: ${task._id} outcome=${task.outcome}`;
      if (process.env.SNS_TOPIC_ARN) {
        await sns
          .publish({ Message: msg, TopicArn: process.env.SNS_TOPIC_ARN })
          .promise();
      }
    } catch (e: unknown) {
      const errMsg = e instanceof Error ? e.message : String(e);
      console.error("SNS publish failed", errMsg);
    }
  },
};
