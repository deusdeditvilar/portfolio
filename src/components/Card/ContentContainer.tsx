import { motion } from "framer-motion"

interface ContentProps {
    description: string;
}

export const ContentContainer = ({ description }: ContentProps) => {

    return (
        <motion.div
            className="content-container"
            style={{ originY: 0, originX: 0 }}
        >
            <p>{description}</p>

        </motion.div>
    )
}