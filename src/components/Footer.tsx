import { useTranslation } from "next-i18next";
import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
    const { t } = useTranslation("common");

    return (
        <footer>
            <div className="container section section-small flex flex-between footer-inner">
                <div className="flex logo-box">
                    <Logo />
                </div>
                <div className="flex page-links">
                    <Link href={"/"} ><a>Home</a></Link>
                    <Link href={"/projects"}><a>{t('projects')}</a></Link>
                </div>
            </div>
        </footer>
    )

}