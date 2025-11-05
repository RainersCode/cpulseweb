 
import CtaArea from "./CtaArea";
import HeroArea from "./HeroArea";
import Cta2Area from "./Cta2Area";
import BlogArea from "./BlogArea";
import AboutArea from "./AboutArea";
import AwardsArea from "./AwardsArea";
import ServiceArea from "./ServiceArea";
import ProjectsArea from "./ProjectsArea";
import WorkprocessArea from "./WorkprocessArea";
import HowItWorksArea from "./HowItWorksArea";
import CryptoNewsArea from "./CryptoNewsArea";
import TwitterFeedArea from "./TwitterFeedArea";
import TopCoinsChartsArea from "./TopCoinsChartsArea";
import HeaderOne from "@/layouts/headers/HeaderOne";
import FooterOne from "@/layouts/footers/FooterOne";
import VideoAreaHomeOne from "./VideoAreaHomeOne";

const HomeOne = () => {
	return (
		<>
			<HeaderOne />
      <HeroArea />
      <ServiceArea />
      <HowItWorksArea />
      <TopCoinsChartsArea />
      <CryptoNewsArea />
      <TwitterFeedArea />
      <Cta2Area />
      <FooterOne />
		</>
	);
};

export default HomeOne;


