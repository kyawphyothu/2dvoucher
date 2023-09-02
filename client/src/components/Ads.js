import banner from "../assets/ads/Banner_Next.gif";
import jdbyg from "../assets/ads/jdbyg.gif";
import haobet from "../assets/ads/haobet777.gif";
import ygn from "../assets/ads/YGN-Cash-Motion-Banner-2.gif";

export const Ads = () => {
	return (
		<div style={{ marginBottom: "16px" }}>
			<img src={banner} style={{ width: "100%" }}></img>
			<img src={jdbyg} style={{ width: "100%" }}></img>
			{/* <img
				src={haobet}
				style={{
					width: "25%",
					position: "absolute",
					bottom: 0,
					left: "50%",
					transform: "translateX(-50%)",
				}}></img> */}
		</div>
	);
};

export const GroupsAds = () => {
	return (
		<div style={{ marginBottom: "16px" }}>
			<img src={ygn} style={{ width: "100%" }}></img>
		</div>
	);
};
