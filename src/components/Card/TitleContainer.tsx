import { motion } from "framer-motion"
import { closeSpring, openSpring } from ".";

interface TitleProps {
    title: string;
    isExpanded: boolean;
}

const scaleTranslate = ({ x, y, scaleX, scaleY }: any) =>
    `scaleX(${scaleX}) scaleY(${scaleY}) translate(${x}, ${y}) translateZ(0)`;

export const TitleContainer = ({isExpanded,title}: TitleProps) => {

    return (
        <motion.div
            className="title-container"
            initial={false}
            transition={isExpanded ? openSpring : closeSpring}
            transformTemplate={scaleTranslate}
            style={{ originX: 0, originY: 0 }}
        >
            <h2>{title}</h2>
        </motion.div>
    )
}