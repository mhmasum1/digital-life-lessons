import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import HeroSlider from "../../home/HeroSlider";
import FeaturedLessons from "../../home/FeaturedLessons";
import TopContributors from "../../home/TopContributors";
import WhyLearningMatters from "../../home/WhyLearningMatters";
import MostSavedLessons from "../../home/MostSavedLessons";

const Home = () => {
    const axiosSecure = useAxiosSecure();

    const [featuredLessons, setFeaturedLessons] = useState([]);
    const [topContributors, setTopContributors] = useState([]);
    const [mostSavedLessons, setMostSavedLessons] = useState([]);

    const safeArray = (data) => {
        if (Array.isArray(data)) return data;
        if (Array.isArray(data?.lessons)) return data.lessons;
        if (Array.isArray(data?.contributors)) return data.contributors;
        return [];
    };

    useEffect(() => {
        axiosSecure
            .get("/lessons/featured")
            .then((res) => setFeaturedLessons(safeArray(res.data)))
            .catch(() => setFeaturedLessons([]));

        axiosSecure
            .get("/stats/top-contributors")
            .then((res) => setTopContributors(safeArray(res.data)))
            .catch(() => setTopContributors([]));

        axiosSecure
            .get("/lessons/most-saved")
            .then((res) => setMostSavedLessons(safeArray(res.data)))
            .catch(() => setMostSavedLessons([]));
    }, [axiosSecure]);

    return (
        <div className="bg-white">
            <HeroSlider />
            <FeaturedLessons lessons={featuredLessons} />
            <WhyLearningMatters />
            <TopContributors contributors={topContributors} />
            <MostSavedLessons lessons={mostSavedLessons} />
        </div>
    );
};

export default Home;
