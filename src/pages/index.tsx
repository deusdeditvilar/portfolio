'use client'
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { motion, LayoutGroup } from "framer-motion";
import { Hero } from "../components/Hero";
import { Card } from "../components/Card";
import { Loading } from "../components/Loading";
import Link from "next/link";
import { NextSeo } from "next-seo";
import { client } from "../lib/apollo";
import { gql } from "@apollo/client";
import { ProjectProps } from "../types/Projects";
import { Social } from "../components/Social";
import { LangProps } from "../types/Langs";


interface GetProjectsQueryResponse {
  projects: ProjectProps,
  langsData: LangProps
}

type Params = {
  locale: string
}

export default function Home({ projects, langsData }: GetProjectsQueryResponse) {
  const { t } = useTranslation("home");

  return (
    <>
      <NextSeo title="Home" />

      <Loading />

      <main className="container">
        <Hero />

        <section className="section section-large" style={{ paddingTop: 0 }} id="about">

          <div className="about flex flex-between gap-md">
            <div className="sticky-texts flex flex-column flex-self-center">
              <h2>{t('about.title')}</h2>
              <p>{t('about.desc.first')}</p>
              <p>{t('about.desc.second')}</p>

            </div>

            <ul className="lang-cards flex">

              {
                langsData.langTags.map((card, count) => {
                  return (
                    <motion.li key={card.id} className="card-lang gap-md" initial={{ opacity: 0, y: 150 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.1, delay: count * .05 }} viewport={{ once: true }} >
                      <div>
                        <motion.img src={card?.langUrl?.url} loading="lazy" alt={`${card.name} Logo`} />
                      </div>
                    </motion.li>
                  )
                })
              }

            </ul>

          </div>

        </section>

        <section className="section section-small" id="home_projects">
          <h2>{t('projects.title')}</h2>

          <motion.ul className="cards-grid">

            {
              projects &&

              projects?.projects.map((project, count) => {
                return (
                  <li key={count}>
                    <LayoutGroup id={`card-${count}`}>
                      <Card imageUrl={project.image.url} imageWidth={project.image.width} imageHeight={project.image.height} id={project.id} options={project.langs} siteUrl={project.siteUrl} ghUrl={project.githubUrl} layout="position" layoutId={`card-${count}`} title={project.title} description={project.description} key={project.id} initial={{ opacity: 0, y: 150 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: count * .2 }} viewport={{ once: true }} />
                    </LayoutGroup>
                  </li>
                )
              })
            }

          </motion.ul>

          <div className="see_more">
            <Link legacyBehavior href={"/projects"}>
              <a >{t('projects.seemore')}</a>
            </Link>
          </div>

        </section>

        <section id="contact">
          <Social mobile />
        </section>

      </main>

    </>
  );
}

export async function getStaticProps({ locale }: Params) {

  const { data: projectsIndexData } = await client.query({
    query: gql`
    query MyQuery($locale: [Locale!]!) {
      projects (
        stage: PUBLISHED
        locales: $locale
        where: {id_in: ${process.env.NEXT_PUBLIC_PROJECT_IDS}}
      ) {
        id
        title
        siteUrl
        githubUrl
        description
        image {
          url
        }
        langs {
          ... on LangTag {
            id
            name
            abbreviation
            langUrl {
              url
              height
              width
            }
          }
        }
      }
    }
    `,
    variables: {
      locale: [locale]
    }
  });

    const { data: langsData } = await client.query({
    query: gql`
      query MyQuery($locale: [Locale!]!) {
        langTags(
          stage: PUBLISHED
          locales: $locale
          orderBy: publishedAt_ASC
          where: {displayOnPage: true}
        ) {
          langUrl {
            url
          }
          id
          abbreviation
          name
          publishedAt
        }
      }
    `,
    variables: {
      locale: [locale]
    }
  });


  return {
    props: {
      ...(await serverSideTranslations(locale, ["home", "common"])),
      projects: projectsIndexData,
      langsData: langsData
    },
  };
}