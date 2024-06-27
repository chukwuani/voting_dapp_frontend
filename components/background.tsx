const Background = () => {
	return (
		<>
			<div
				style={{
					width: "100vw",
					minHeight: "100vh",
					position: "fixed",
					zIndex: -1,
					display: "flex",
					justifyContent: "center",
					padding: "120px 24px 160px 24px",
					pointerEvents: "none",
				}}>
				<div
					style={{
						background: "radial-gradient(circle, rgba(2, 0, 36, 0) 0, #fafafa 100%)",
						position: "absolute",
						content: '""',
						zIndex: 2,
						width: "100%",
						height: "100%",
						top: 0,
					}}></div>

				{/* <div
					style={{
						content: '""',
						backgroundImage: "url(https://assets.dub.co/misc/grid.svg)",
						zIndex: 1,
						position: "absolute",
						width: "100%",
						height: "100%",
						top: 0,
						opacity: 0.4,
						filter: "invert(1)",
					}}></div> */}

				<div
					style={{
						zIndex: 3,
						width: "100%",
						maxWidth: "640px",
						backgroundImage: `radial-gradient(at 27% 37%, hsla(215, 98%, 61%, 1) 0px, transparent 0%),
		                 radial-gradient(at 97% 21%, hsla(125, 98%, 72%, 1) 0px, transparent 50%),
		                 radial-gradient(at 52% 99%, hsla(354, 98%, 61%, 1) 0px, transparent 50%),
		                 radial-gradient(at 10% 29%, hsla(256, 96%, 67%, 1) 0px, transparent 50%),
		                 radial-gradient(at 97% 96%, hsla(38, 60%, 74%, 1) 0px, transparent 50%),
		                 radial-gradient(at 33% 50%, hsla(222, 67%, 73%, 1) 0px, transparent 50%),
		                 radial-gradient(at 79% 53%, hsla(343, 68%, 79%, 1) 0px, transparent 50%)`,
						position: "absolute",
						height: "100%",
						filter: "blur(100px) saturate(150%)",
						top: "80px",
						opacity: 0.15,
					}}></div>
			</div>

			{/* <div
				className="w-full h-[180px] fixed opacity-100"
				style={{
					background:
						"linear-gradient(rgba(174, 47, 206, 0.2) 0%, rgba(232, 115, 55, 0.1) 52.58%, rgba(153, 93, 8, 0) 100%)",
				}}></div> */}
		</>
	);
};
export default Background;
