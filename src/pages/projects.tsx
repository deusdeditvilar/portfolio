import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import { LayoutGroup, motion } from "framer-motion";
import { Card } from "../components/Card";
import { useState } from "react";
import classNames from "classnames";
import { client } from "../lib/apollo";
import { gql } from "@apollo/client";
import { ProjectProps } from "../types/Projects";

interface GetProjectsQueryResponse {
  projects: ProjectProps
}

export default function Projects({ projects }: GetProjectsQueryResponse) {
  const { locale } = useRouter();
  const [filter, setFilter] = useState('all')


  const filterLangs = [
    {
      id: "all",
      name: "Todos"
    },
    {
      id: "dj",
      name: "Django"
    },
    {
      id: "hcj",
      name: "HTML (Static)"
    },
    {
      id: "rjs",
      name: "React"
    },
    {
      id: "rn",
      name: "React Native"
    },
  ]

  const filteredProjs = filter != 'all' ?
    projects.projects.filter(item => { return item.langs.find(tag => { if (tag.abbreviation === filter) { return true } }); })
    : null

  return (
    <>
      <NextSeo noindex={true} title={"Projects"} />
      <main>
        <div className="container section section-large">

          <div className="lang-filter">
            <ul className="flex flex-wrap">
              {
                filterLangs.map((lang) => {
                  return (
                    <li key={lang.id}>
                      <button onClick={e => setFilter(lang.id)} className={classNames({
                        'active': filter === lang.id,
                      })}>
                        {lang.name}
                      </button>
                    </li>
                  )
                })
              }
            </ul>
          </div>

          <motion.ul className="cards-grid">

            {
              filter === 'all' ?

                projects?.projects.map((project, count) => {
                  return (
                    <LayoutGroup key={count} id={`card-${count}`}>
                      <li key={count}>
                        <Card imageUrl={project.image.url} imageWidth={project.image.width} imageHeight={project.image.height} id={project.id} options={project.langs} siteUrl={project.siteUrl} ghUrl={project.githubUrl} layoutId={`card-${count}`} title={project.title} description={project.description} key={project.id} initial={{ opacity: 0, y: 150 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 150 }} transition={{ duration: 0.5, delay: count * .2 }} viewport={{ once: true }} />
                      </li>
                    </LayoutGroup>
                  )
                })

                :

                filteredProjs ?
                  filteredProjs.map((project, count) => {
                    return (
                      <LayoutGroup key={count} id={`card-${count}`}>
                        <li>
                          <Card imageUrl={project.image.url} imageWidth={project.image.width} imageHeight={project.image.height} id={project.id} options={project.langs} siteUrl={project.siteUrl} ghUrl={project.githubUrl} layoutId={`card-${count}`} title={project.title} description={project.description} key={project.id} initial={{ opacity: 0, y: 150 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 150 }} transition={{ duration: 0.5, delay: count * .2 }} viewport={{ once: true }} />
                        </li>
                      </LayoutGroup>
                    )
                  })

                  :

                  <p>Não tem nada aqui</p>

            }

          </motion.ul>
        </div>
      </main>
    </>
  )
}

export async function getStaticProps({ locale }: any) {
  const { data } = await client.query({
    query: gql`
    query MyQuery($locale: [Locale!]!) {
      projects (
        stage: PUBLISHED
        locales: $locale
      ) {
        id
        title
        siteUrl
        githubUrl
        description
        image {
          url
          width
          height
        }
        langs {
          ... on LangTag {
            id
            name
            abbreviation
            langUrl {
              url
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
  return {
    props: {
      ...(await serverSideTranslations(locale)),
      projects: data
    },
  };
}