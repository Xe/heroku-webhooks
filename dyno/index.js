const Webhook = require("webhook-discord");
const discordHook = new Webhook(process.env.DISCORD_WEBHOOK_URL);

/**
 * Responds to Heroku dyno events.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.main = (req, res) => {
    const hook = req.body; // https://devcenter.heroku.com/articles/webhook-dyno-events#dyno-event-format
    let message = "";

    message = message + "App " + hook.data.app.name + " dyno " + hook.data.name + " (" + hook.data.id + ") (" + hook.data.size + ")";
    message = message + "\nstate: " + hook.data.state + "\ncommand: " + hook.data.command + "\nmanagement: " + hook.data.management;
    if (hook.data.exit_status != null) {
        message = message + "\nexit status: " + hook.data.exit_status;
    }

    discordHook.info("Heroku", message);

    res.status(200).send(message);
};
