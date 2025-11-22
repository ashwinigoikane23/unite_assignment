"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notifier = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const twilio_1 = __importDefault(require("twilio"));
const sns = new aws_sdk_1.default.SNS({ region: process.env.AWS_REGION || "us-east-1" });
const twClient = (0, twilio_1.default)(process.env.TWILIO_SID || "", process.env.TWILIO_AUTH || "");
exports.notifier = {
    async notifyAssignment(task) {
        try {
            const msg = `Task assigned: ${task._id}`;
            if (process.env.SNS_TOPIC_ARN) {
                await sns
                    .publish({ Message: msg, TopicArn: process.env.SNS_TOPIC_ARN })
                    .promise();
            }
        }
        catch (e) {
            const errMsg = e instanceof Error ? e.message : String(e);
            console.error("SNS publish failed", errMsg);
        }
        try {
        }
        catch (e) {
            const errMsg = e instanceof Error ? e.message : String(e);
            console.error("Twilio send failed", errMsg);
        }
    },
    async notifyCompletion(task) {
        try {
            const msg = `Task completed: ${task._id} outcome=${task.outcome}`;
            if (process.env.SNS_TOPIC_ARN) {
                await sns
                    .publish({ Message: msg, TopicArn: process.env.SNS_TOPIC_ARN })
                    .promise();
            }
        }
        catch (e) {
            const errMsg = e instanceof Error ? e.message : String(e);
            console.error("SNS publish failed", errMsg);
        }
    },
};
//# sourceMappingURL=notifier.service.js.map