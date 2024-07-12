"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
	votes: {
		label: "Votes",
	},
	bitch: {
		label: "Bitch",
		color: "hsl(var(--chart-1))",
	},
	not_bitch: {
		label: "Not Bitch",
		color: "hsl(var(--chart-5))",
	},
} satisfies ChartConfig;

export default function ResultChart({ voteCount }: { voteCount: any[] }) {
	const chartData = [
		{ proposal: "Is a Bitch ", votes: voteCount[0], fill: "var(--color-bitch)" },
		{ proposal: "Not a bitch ", votes: voteCount[1], fill: "var(--color-not_bitch)" },
	];

	const totalVotes = chartData.reduce((acc, curr) => acc + curr.votes, 0);

	return (
		<Card className="flex flex-col">
			<CardContent className="flex-1 pb-0">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square max-h-[250px]">
					<PieChart>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Pie
							data={chartData}
							dataKey="votes"
							nameKey="proposal"
							innerRadius={60}
							strokeWidth={5}>
							<Label
								content={({ viewBox }) => {
									if (viewBox && "cx" in viewBox && "cy" in viewBox) {
										return (
											<text
												x={viewBox.cx}
												y={viewBox.cy}
												textAnchor="middle"
												dominantBaseline="middle">
												<tspan
													x={viewBox.cx}
													y={viewBox.cy}
													className="fill-foreground text-3xl font-bold">
													{totalVotes.toLocaleString()}
												</tspan>
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) + 24}
													className="fill-muted-foreground">
													{totalVotes > 1 ? "Votes" : "Vote"}
												</tspan>
											</text>
										);
									}
								}}
							/>
						</Pie>
					</PieChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
