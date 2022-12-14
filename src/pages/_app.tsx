import '../styles/global.scss'
import type { AppProps } from 'next/app'
import Header from '../components/Header'
import { appWithTranslation } from 'next-i18next';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { DefaultSeo } from 'next-seo';
import { Social } from '../components/Social';
import Footer from '../components/Footer';
import Script from 'next/script';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GTAG_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.NEXT_PUBLIC_GTAG_ID}');
        `}
      </Script>
      <DefaultSeo
        titleTemplate='Deusdedit Vilar | %s'
        canonical={process.env.NEXT_PUBLIC_HOST}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: `${process.env.NEXT_PUBLIC_HOST}/logo.ico`,
          }
        ]}
        languageAlternates={[{
          hrefLang: 'en',
          href: `${process.env.NEXT_PUBLIC_HOST}/en`,
        }]}
        description="Deusdedit Vilar é um engenheiro Full-Stack especializado em construir experiências digitais excepcionais."
        additionalMetaTags={[
          {
            property: 'keywords',
            content: "Deusdedit Vilar,desenvolvedor,developer,fullstack,Full-Stack,frontend,backend,dev,portfolio"
          }
        ]}
        openGraph={{
          type: 'website',
          url: process.env.NEXT_PUBLIC_HOST,
          title: 'Deusdedit Vilar | Full-Stack Dev',
          description: "Deusdedit Vilar's Full-Stack dev portfolio.",
          images: [
            {
              url: `${process.env.NEXT_PUBLIC_HOST}/src_1200.png`,
              width: 1200,
              height: 630,
              alt: 'Logo com as letras D e V entrelaçadas com os dizeres Deusdedit Vilar embaixo',
            }
          ],
        }}
        robotsProps={{ noarchive: true, maxSnippet: -1 }}
      />
      <Header />
      <AnimatePresence>
        <Social key={router.locale} />
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
      <Footer />
    </>
  )
}

export default appWithTranslation(MyApp);
