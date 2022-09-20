import React, { useEffect, useRef } from "react";
import { motion, useAnimationControls, useInView } from "framer-motion";
import { AnimatedLetters } from "./AnimatedLetters";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";


export const Hero = () => {
    const { t } = useTranslation("home");
    const placeholderText = [
        {
            as: "h1",
            text: t("hero.top"),
            class: "hero-top"
        },
        {
            as: "h2",
            text: t("hero.middle"),
            class: "hero-title"
        },
        {
            as: "h3",
            text: t("hero.bottom"),
            class: "hero-bottom"
        }
    ];


    const container = {
        visible: {
            transition: {
                staggerChildren: 0.025
            }
        }
    };

    const resume = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
            transition: {
                delay: 4.4
            }
        }
    }

    const controls = useAnimationControls()
    const ref = useRef(null)
    const isInView = useInView(ref)
    const { locale } = useRouter()

    useEffect(() => {
        isInView && (
            setTimeout(() => {
                controls.start("visible")
            }, 3500))
    }, [controls, isInView])

    return (
        <motion.section
            ref={ref}
            className="banner"
            initial="hidden"
            animate={controls}
            viewport={{ once: true }}
            variants={container}
        >

            <motion.div className="banner_inner">
                {placeholderText.map((item, index) => {
                    return <AnimatedLetters className={item.class} {...item} key={index} />;
                })}
                <motion.a variants={resume} animate={controls} initial="hidden" className="resume-button" href={locale == 'en' ? "https://media.graphassets.com/DYdlv5WqRYasw0kXrZix" : "https://media.graphassets.com/GwTORoMWTDyw8RFmLiBy"} target="_blank" rel="noopener noreferrer">{t("hero.resume")}</motion.a>
            </motion.div>
        </motion.section>
    )
};