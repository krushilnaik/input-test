import type { PropsWithChildren } from "react";
import type { Components } from "react-markdown";

import { createMoleculeWrapper } from "../utils/components.tsx";

import { baseComponents } from "./base/index.tsx";
import ChartRenderer from "./charts/ChartRenderer.tsx";
import GrowthKPIRenderer from "./others/GrowthKPIRenderer.tsx";
import HeadlineRenderer from "./others/HeadlineRenderer.tsx";
import ImageRenderer from "./others/ImageRenderer.tsx";
import ImageSectionRenderer from "./others/ImageSectionRenderer.tsx";
import JiraPromptRenderer from "./others/JiraPromptRenderer.tsx";
import KPIRenderer from "./others/KPIRenderer.tsx";
import ProjectStartCTARenderer from "./others/ProjectStartCTARenderer.tsx";
import ProjectSummaryRenderer from "./others/ProjectSummaryRenderer.tsx";
import SectionRenderer from "./others/SectionRenderer.tsx";
import StatusRenderer from "./others/StatusRenderer.tsx";

type ChartProps = {
  label: string;
  cols?: number;
  data: string;
};

type ExtendedComponents = Components & {
  // grouping elements
  statusgrid?: React.FC<PropsWithChildren<{}>>;
  chartrow?: React.FC<PropsWithChildren<{}>>;
  kpirow?: React.FC<PropsWithChildren<{}>>;

  // custom eclipse molecules
  piechart?: React.FC<ChartProps>;
  barchart?: React.FC<ChartProps>;
  linechart?: React.FC<ChartProps>;
  choroplethchart?: React.FC<ChartProps>;
  scatterchart?: React.FC<ChartProps>;
  status?: React.FC<any>;
  headline?: React.FC<any>;
  headlinenoicon?: React.FC<any>;
  kpi?: React.FC<any>;
  growthkpi?: React.FC<any>;
  sectionchecklist?: React.FC<any>;
  sectiontext?: React.FC<any>;
  sectionlist?: React.FC<any>;
  image?: React.FC<any>;
  imagewithtextandurl?: React.FC<any>;
  projectstartcta?: React.FC<any>;
  projectsummary?: React.FC<any>;
  jiraprompt?: React.FC<any>;
};

export const components: ExtendedComponents = {
  // default markdown elements (e.g. headings, paragraphs, lists, etc.)
  ...baseComponents,

  // grouping elements
  chartrow: ({ children }) => <div className="grid grid-cols-12 gap-3">{children}</div>,
  statusgrid: ({ children }) => (
    <div className="mb-4 flex flex-wrap">
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <div
            key={index}
            className={`w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)] ${
              index < children.length - 1
                ? "border-secondary-gray mb-4 md:mr-4 md:mb-0 md:border-r md:pr-4 lg:mr-4 lg:border-r lg:pr-4"
                : "mb-4 md:mb-0"
            }`}
          >
            {child}
          </div>
        ))
      ) : (
        <div className="w-full">{children}</div>
      )}
    </div>
  ),

  // charts (rendered with Nivo charts)
  piechart: (props: ChartProps) => <ChartRenderer {...props} type="pie" />,
  barchart: (props: ChartProps) => <ChartRenderer {...props} type="bar" />,
  linechart: (props: ChartProps) => <ChartRenderer {...props} type="line" />,
  choroplethchart: (props: ChartProps) => <ChartRenderer {...props} type="choropleth" />,
  scatterchart: (props: ChartProps) => <ChartRenderer {...props} type="scatter" />,

  // other Eclipse molecules
  status: createMoleculeWrapper(StatusRenderer),
  headline: createMoleculeWrapper(HeadlineRenderer, { showIcon: true }),
  headlinenoicon: createMoleculeWrapper(HeadlineRenderer, { showIcon: false }),
  kpi: createMoleculeWrapper(KPIRenderer),
  growthkpi: createMoleculeWrapper(GrowthKPIRenderer),
  sectionchecklist: createMoleculeWrapper(SectionRenderer, {
    type: "checklist",
  }),
  sectiontext: createMoleculeWrapper(SectionRenderer, { type: "text" }),
  sectionlist: createMoleculeWrapper(SectionRenderer, { type: "list" }),
  image: createMoleculeWrapper(ImageRenderer),
  imagewithtextandurl: createMoleculeWrapper(ImageSectionRenderer),
  projectstartcta: createMoleculeWrapper(ProjectStartCTARenderer),
  projectsummary: createMoleculeWrapper(ProjectSummaryRenderer),
  jiraprompt: createMoleculeWrapper(JiraPromptRenderer),
};
