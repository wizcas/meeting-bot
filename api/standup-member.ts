import { VercelRequest, VercelResponse } from "@vercel/node";
import { doStandupMember } from "../command/standup-member";
import { parseSlackArgs } from "../slack/argument-parser";
import { SlackCommand } from "../slack/types";
import { logger, LoggerType } from "../utils/log";

const L = logger("Standup Rot", LoggerType.Command);

export default async function (req: VercelRequest, res: VercelResponse) {
    const { command, text, channel_id } = req.body as SlackCommand;

    if (command !== "/standup-member") {
        L.error("Bad command:", command);
        res.status(400).send("bad command");
        return;
    }

    const message = await doStandupMember(channel_id, parseSlackArgs(text));
    res.status(200).send(message);
}
