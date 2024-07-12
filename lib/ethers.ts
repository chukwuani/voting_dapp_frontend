import { ethers } from "ethers";

export const ethersProvider = async () => {
	let provider = new ethers.BrowserProvider(window.ethereum);

	let signer = await provider.getSigner();
	const chainId = (await provider.getNetwork()).chainId;

	const address = await signer.getAddress();

	return { provider, signer, chainId, address };
};
