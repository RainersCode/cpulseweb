import Breacrumb from "@/common/Breacrumb";
import HeaderOne from "@/layouts/headers/HeaderOne";
import React from "react";
import Cta2Area from "../homes/home/Cta2Area";
import FooterOne from "@/layouts/footers/FooterOne";
import GuideContent from "./GuideContent";

const Guide = () => {
	return (
		<>
			<HeaderOne />
			<Breacrumb title="Bot Guide" subtitle="How to Use" bgImage="/pricing-page/articleWP.webp" />
			<GuideContent />
			<Cta2Area />
			<FooterOne />
		</>
	);
};

export default Guide;
