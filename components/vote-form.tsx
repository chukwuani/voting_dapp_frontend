"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ethersProvider } from "@/lib/ethers";
import { contractABI } from "@/lib/utils";
import { ethers } from "ethers";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import ResultChart from "./result-chart";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./ui/dialog";

const VoteForm = () => {
	const [value, setValue] = useState<undefined | number>();
	const [voteCount, setVoteCount] = useState<any[]>([]);

	const contractAddress = "0x0ad6b9dE99d4EBbC5D8F92F455a337146075fed4";

	const [isLoading, startTransition] = useTransition();

	const handleVote = () => {
		startTransition(async () => {
			const { signer, address } = await ethersProvider();

			const votingContract = new ethers.Contract(contractAddress, contractABI, signer);
			const voterInfo = await votingContract.voters(address);
			const hasVoted = voterInfo.hasVoted;

			if (hasVoted) {
				toast.error("Already voted", {
					description: "You can't vote twice with the same account.",
				});
				return;
			} else {
				const transaction = await votingContract.vote(0);

				toast.success("Vote passed", {
					description:
						"The community decision has been approved. Action will be taken as per the vote outcome.",
				});

				console.log({ transaction });
			}
		});
	};

	const handleWinningVote = async () => {
		const { signer } = await ethersProvider();

		const votingContract = new ethers.Contract(contractAddress, contractABI, signer);

		const result = await votingContract.voteResult();

		setVoteCount([Number(result.firstProposal), Number(result.secondProposal)]);
	};

	return (
		<>
			<CardContent className="p-6 pt-0 grid gap-6">
				<h3 className="text-lg font-semibold leading-none tracking-tight">Proposals</h3>

				<div className=" flex items-center space-x-4 rounded-md border p-4">
					<div className="flex-1 space-y-1">
						<p className="text-sm font-medium leading-none">David is a bitch</p>
						<p className="text-sm text-muted-foreground">
							Vote on whether to remove the current admin from their position in the DAO.
						</p>
					</div>

					<Switch
						checked={value === 0}
						onCheckedChange={() => setValue(0)}
					/>
				</div>

				<div className=" flex items-center space-x-4 rounded-md border p-4">
					<div className="flex-1 space-y-1">
						<p className="text-sm font-medium leading-none">David is not a bitch</p>
						<p className="text-sm text-muted-foreground">
							Vote on whether to keep the current admin in their position in the DAO.
						</p>
					</div>

					<Switch
						checked={value === 1}
						onCheckedChange={() => setValue(1)}
					/>
				</div>
			</CardContent>

			<CardFooter className="flex items-center p-6 pt-0 gap-3">
				<Button
					disabled={value === undefined || isLoading}
					onClick={handleVote}
					className="w-full">
					{isLoading ? "Voting" : "Vote"}
				</Button>

				<Dialog onOpenChange={() => setVoteCount([])}>
					<DialogTrigger asChild>
						<Button
							onClick={() => void handleWinningVote().catch(console.log)}
							className="w-full"
							variant="secondary">
							View Result
						</Button>
					</DialogTrigger>

					<DialogContent className="sm:max-w-[425px] border-none">
						<DialogTitle>Election Outcomes at a Glance: Your Voice, Visualized</DialogTitle>

						<DialogDescription>
							See the will of the people unfold. Our clear, comprehensive display presents official
							election results with easy-to-understand graphics.
						</DialogDescription>

						<ResultChart voteCount={voteCount} />
					</DialogContent>
				</Dialog>
			</CardFooter>
		</>
	);
};
export default VoteForm;
