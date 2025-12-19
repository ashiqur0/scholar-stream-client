import { motion } from "framer-motion"
import { useEffect, useState } from "react";

const Stories = () => {

    const [stories, setStories] = useState([]);

    useEffect(() => {
        fetch('/story.json')
            .then(res => res.json())
            .then(data => setStories(data));
    }, [])

    return (
        <div className="md:max-w-7xl md:mx-auto p-4">

            <h1 className="md:text-3xl text-2xl font-bold text text-center mt-15 mb-7 text-orange-400">Our Stories</h1>

            <div className="overflow-hidden w-full rounded-lg grid md:grid-cols-2 grid-cols-1 ">
            {stories.map((story, index) => (
                <motion.div
                    key={story.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.5,
                        delay: index * 0.12,
                        ease: "easeOut",
                    }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="card bg-base-100 shadow-md p-6 mb-6"
                >
                    <h2 className="text-xl font-semibold mb-2">{story.title}</h2>
                    <p className="text-base-content/80">{story.story}</p>
                </motion.div>
            ))}
        </div>
        </div>
    )
}

export default Stories;