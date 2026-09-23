import { getContent } from "@/content";
import { pageMetadata } from "@/lib/metadata";
import { PageIntro } from "@/components/page/PageIntro";
import { ProjectsIndex, type ProjectFilter } from "@/components/page/ProjectsIndex";
import { CtaBand } from "@/components/page/CtaBand";
import styles from "./page.module.css";

const content = getContent();
const page = content.pages.work;

export const metadata = pageMetadata(page.meta, "/our-projects/");

const countFor = (id: ProjectFilter) =>
  id === "all" ? content.projects.length : content.projects.filter((project) => project.categories.includes(id)).length;

/** "All", then every category that has at least one project, in the order the filters list them. */
function projectFilters() {
  return (Object.keys(page.filters) as ProjectFilter[])
    .filter((id) => countFor(id) > 0)
    .map((id) => ({ id, label: page.filters[id], count: page.countLabel(countFor(id)) }));
}

export default function ProjectsPage() {
  // This page is the work index, so the closing band points on to Services instead.
  const cta = { ...content.pages.cta, secondary: content.services.link };

  return (
    <>
      <PageIntro intro={page.intro} />
      <div className={styles.listing}>
        <div className="container">
          <ProjectsIndex
            projects={content.projects}
            filters={projectFilters()}
            filterLabel={page.filterLabel}
            empty={page.empty}
          />
        </div>
      </div>
      <CtaBand cta={cta} />
    </>
  );
}
