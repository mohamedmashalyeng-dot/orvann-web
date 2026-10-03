import type { Metadata } from "next";
import { serviceIds, type SiteContent } from "@/content";
import { contentFor, type LangParams } from "@/content/server";
import { pageMetadata } from "@/lib/metadata";
import { PageIntro } from "@/components/page/PageIntro";
import { ProjectsIndex, type ProjectFilter } from "@/components/page/ProjectsIndex";
import { CtaBand } from "@/components/page/CtaBand";
import { ProjectFan } from "@/components/visuals/ProjectFan";
import styles from "./page.module.css";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const content = await contentFor(params);
  return pageMetadata(content, content.pages.work.meta, "/our-projects/");
}

/** "All", then each of the five services that has at least one project, in service order. */
function projectFilters(content: SiteContent) {
  const page = content.pages.work;
  const countFor = (id: ProjectFilter) =>
    id === "all" ? content.projects.length : content.projects.filter((project) => project.categories.includes(id)).length;
  const label = (id: ProjectFilter) => (id === "all" ? page.all : content.serviceNames[id]);
  return (["all", ...serviceIds] as ProjectFilter[])
    .filter((id) => countFor(id) > 0)
    .map((id) => ({ id, label: label(id), count: page.countLabel(countFor(id)) }));
}

export default async function ProjectsPage({ params }: LangParams) {
  const content = await contentFor(params);
  const page = content.pages.work;

  return (
    <>
      <PageIntro
        intro={page.intro}
        visual={<ProjectFan images={content.projects.filter((project) => project.featured).map((project) => project.image)} />}
      />
      <div className={styles.listing}>
        <div className="container">
          <ProjectsIndex
            locale={content.locale}
            projects={content.projects}
            serviceNames={content.serviceNames}
            filters={projectFilters(content)}
            filterLabel={page.filterLabel}
            empty={page.empty}
          />
        </div>
      </div>
      <CtaBand cta={content.pages.cta} />
    </>
  );
}
