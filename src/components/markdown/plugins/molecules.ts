import type { Transformer } from "unified";

import { createRemarkDirective } from "../utils/directives";

/**
 * Creates a remark transformer for molecule directives
 */
export default function remarkMoleculeDirective(): Transformer {
	return createRemarkDirective({
		directives: {
			headline: "headline",
			"headline-no-icon": "headlinenoicon",
			kpi: "kpi",
			"growth-kpi": "growthkpi",
			"section-checklist": "sectionchecklist",
			"section-text": "sectiontext",
			"section-list": "sectionlist",
			image: "image",
			"image-with-text-and-url": "imagewithtextandurl",
			"project-start-cta": "projectstartcta",
			"project-summary": "projectsummary",
			"jira-prompt": "jiraprompt",
		},
		wrapperTag: undefined,
		useColumnGrouping: false,
		preserveStringData: true, // Preserve string data with newlines for molecules
	});
}
