"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { ethersProvider } from "@/lib/ethers";

const ConnectWallet = () => {
	const [address, setAddress] = useState("");

	const handleConnectMetamask = async () => {
		try {
			const { provider, chainId, address } = await ethersProvider();

			const truncatedAddress = address.slice(0, 6) + "..." + address.slice(-5);
			setAddress(truncatedAddress);

			// switch to tabi test network
			if (Number(chainId) !== 9789) {
				await provider.send("wallet_switchEthereumChain", [{ chainId: "0x263d" }]);
			}

			console.log({ address, chainId: Number(chainId) });
		} catch (error) {}
	};

	return (
		<Button
			onClick={() => void handleConnectMetamask()}
			variant="outline">
			{address ? address : "Connect wallet"}
		</Button>
	);
};
export default ConnectWallet;
