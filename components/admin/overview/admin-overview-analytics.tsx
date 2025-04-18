"use client";

import { useState } from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AdminOverviewAnalytics() {
    const [period, setPeriod] = useState<"week" | "month" | "year">("week");

    return (
        <Card>
            <CardHeader>
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-col items-start justify-center">
                        <CardTitle>Analytics</CardTitle>
                        <CardDescription>
                            View revenue and enrollment analytics
                        </CardDescription>
                    </div>
                    <Tabs
                        value={period}
                        onValueChange={(value) =>
                            setPeriod(value as "week" | "month" | "year")
                        }
                    >
                        <TabsList>
                            <TabsTrigger value="week">Week</TabsTrigger>
                            <TabsTrigger value="month">Month</TabsTrigger>
                            <TabsTrigger value="year">Year</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    className="h-96"
                    config={{
                        revenue: {
                            label: "Revenue",
                            color: "hsl(var(--chart-1))",
                        },
                    }}
                >
                    <ResponsiveContainer>
                        <BarChart>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis
                                yAxisId="left"
                                orientation="left"
                                stroke="var(--color-revenue)"
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar
                                yAxisId="left"
                                dataKey="revenue"
                                fill="var(--color-revenue)"
                                name="Revenue"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
