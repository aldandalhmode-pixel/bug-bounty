import test from "node:test";
import assert from "node:assert/strict";
import { listUsers } from "../services/userService.js";
import { listJobs } from "../services/jobService.js";
import { listProposals } from "../services/proposalService.js";
import { listMessages } from "../services/messageService.js";
import { listNotifications } from "../services/notificationService.js";
import { listReviews } from "../services/reviewService.js";

const listServices = [
  ["users", listUsers],
  ["jobs", listJobs],
  ["proposals", listProposals],
  ["messages", listMessages],
  ["notifications", listNotifications],
  ["reviews", listReviews]
];

for (const [name, list] of listServices) {
  test(`list${name[0].toUpperCase() + name.slice(1)} returns an independent array snapshot`, async () => {
    const before = await list();
    const originalLength = before.length;

    before.push({ id: "caller-only-record" });

    const after = await list();
    assert.equal(after.length, originalLength);
    assert.notStrictEqual(after, before);
  });
}
