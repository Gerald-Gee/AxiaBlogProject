// utils/cron.js
import cron from "node-cron";

export const scheduleCron = (schedule, task, options = { scheduled: true, timezone: "UTC" }) => {
  cron.schedule(schedule, task, options);
};
