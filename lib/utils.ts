import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const contractABI = [
	{
		inputs: [
			{
				internalType: "bytes32[]",
				name: "proposalNames",
				type: "bytes32[]",
			},
		],
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		inputs: [],
		name: "admin",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "getProposals",
		outputs: [
			{
				components: [
					{
						internalType: "bytes32",
						name: "name",
						type: "bytes32",
					},
					{
						internalType: "uint256",
						name: "voteCount",
						type: "uint256",
					},
				],
				internalType: "struct VotingDapp.Proposal[]",
				name: "",
				type: "tuple[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "proposals",
		outputs: [
			{
				internalType: "bytes32",
				name: "name",
				type: "bytes32",
			},
			{
				internalType: "uint256",
				name: "voteCount",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "voterAddress",
				type: "address",
			},
		],
		name: "registerVoter",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_vote",
				type: "uint256",
			},
		],
		name: "vote",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "voteResult",
		outputs: [
			{
				internalType: "uint256",
				name: "firstProposal",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "secondProposal",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		name: "voters",
		outputs: [
			{
				internalType: "uint256",
				name: "vote",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256",
			},
			{
				internalType: "bool",
				name: "hasVoted",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "winningName",
		outputs: [
			{
				internalType: "bytes32",
				name: "winningName_",
				type: "bytes32",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "winningProposal",
		outputs: [
			{
				internalType: "uint256",
				name: "winningProposal_",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
];
