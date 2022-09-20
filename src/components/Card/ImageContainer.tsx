import { motion } from "framer-motion"
import { closeSpring } from "."

interface ImageProps {
    src: string;
    alt?: string;
    width?: number | null;
    height?: number | null;
}

export const ImageContainer = ({ src, alt, width, height }: ImageProps) => {

    return (
        <motion.div
            className="card-image-container">
            <motion.img
            className="card-image"
            width={width ? width : 300}
            height={height ? height : 300}
            layout
            src={src}
            initial={false}
            transition={closeSpring}
            alt={alt ? alt : "Project Template Image"}
        />
            {/* <motion.img src="https://media.graphassets.com/HE1ToT38RjQL3EKv9w1r" alt="" width={400} height={400} /> */}
        </motion.div>
    )
}