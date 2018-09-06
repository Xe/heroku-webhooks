const Webhook = require("webhook-discord");
const discordHook = new Webhook(process.env.DISCORD_WEBHOOK_URL);

/**
 * Responds to Heroku API Release events.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.main = (req, res) => {
    const hook = req.body; // https://devcenter.heroku.com/articles/webhook-events#api-release
    let message = "";

    message = message + "App " + hook.data.app.name + " release id " + hook.data.id + " " + hook.action + "d.\n";
    message = message + "description: " + hook.data.description + ": " + hook.data.status;

    discordHook.info("Heroku", message);

    res.status(200).send(message);
};
