import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion"
import classNames from "classnames";

import Logo from "./Logo";

const langs = [
    { code: 'pt_BR', nativeName: `Portuguese 🇧🇷`, flag: '&#127463;&#127479;' },
    { code: 'en', nativeName: 'English 🇺🇸', flag: '&#127463;&#127479;' },
];

export default function Header() {

    const [active, setActive] = useState(false)
    const router = useRouter();

    useEffect(() => {
        window.onscroll = () => {
            var top = window.pageYOffset || document.documentElement.scrollTop;
            top > 10 ? setActive(true) : setActive(false)
        }
    }, [])

    function changeLocale(lang: React.MouseEvent<HTMLButtonElement>) {
        router.push(router.route, router.asPath, {
            locale: lang.currentTarget.value,
        });
    }

    return (
        <motion.header initial={{opacity: 0}} whileInView={{opacity: 1, transition: {opacity: {delay:0.4}}}} className={classNames('header', {
            'scrolled': active,
        })} >
            <div className="container flex flex-align-center flex-between header_container">

                <Link href="/" >
                    <a aria-label="Website Logo" className="flex logo-box">
                        <Logo />
                    </a>
                </Link>

                <div className="dropdown-container">
                    <input className="dropdown" type="checkbox" id="dropdown" name="dropdown" />
                    <label className="for-dropdown" htmlFor="dropdown">{router.locale === 'en' ? 'English 🇺🇸' : 'Portuguese 🇧🇷'} <i className="uil uil-arrow-down"></i></label>
                    <div className="section-dropdown">
                        {langs.map((lang) => {
                            return (
                                <button key={lang.code} role="button" onClick={changeLocale} value={lang.code} >{lang.nativeName} </button>
                            )
                        })}
                    </div>
                </div>
            </div>
        </motion.header>
    )
}