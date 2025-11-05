import Breacrumb from "@/common/Breacrumb";
import HeaderOne from "@/layouts/headers/HeaderOne";
import React from "react";
import NewsPage from "../news/NewsPage";

const Articles = () => {
	return (
		<>
			<HeaderOne />
			<Breacrumb title="Crypto News & Updates" subtitle="Articles" bgImage="/pricing-page/articleWP.webp" />
			<NewsPage />
		</>
	);
};

export default Articles;
