import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { EXECUTION_MODE_BLOCK } from "../src/rules.js";

const SECTION_NAME = "unrestricted_execution_mode";

/**
 * Pi port of dsh-unrestricted.
 *
 * The DSH plugin hooks `system-prompt/assemble`. Pi's equivalent public
 * extension hook is `before_agent_start`, where a structured system-prompt
 * section can be added without replacing Pi's normal prompt or tool protocol.
 */
export default function unrestricted(pi: ExtensionAPI) {
	let enabled = true;

	pi.on("before_agent_start", (event) => {
		if (enabled) {
			event.systemPromptOptions.sections[SECTION_NAME] = EXECUTION_MODE_BLOCK;
		} else {
			delete event.systemPromptOptions.sections[SECTION_NAME];
		}
	});

	pi.registerCommand("unrestricted", {
		description: "Toggle the dsh-unrestricted prompt section",
		handler: async (_args, ctx) => {
			enabled = !enabled;
			ctx.ui.notify(`dsh-unrestricted: ${enabled ? "enabled" : "disabled"}`, "info");
		},
	});
}
