"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Crown } from "lucide-react";

type LeaderboardEntry = {
  id: string;
  name: string;
  avatar?: string;
  profit: number;
};

const mockLeaderboard: LeaderboardEntry[] = [
  { id: "1", name: "Alice Johnson", avatar: "", profit: 12450.75 },
  { id: "2", name: "Bob Smith", avatar: "", profit: 9500.4 },
  { id: "3", name: "Charlie Lee", avatar: "", profit: -2300.2 },
  { id: "4", name: "Diana Prince", avatar: "", profit: 7850.0 },
  { id: "5", name: "Ethan Clark", avatar: "", profit: -120.5 },
];

/**
 * A component that displays a leaderboard of top traders.
 * The leaderboard shows the name, rank, and profit of each trader.
 * The component uses a Card component with a CardHeader and CardContent.
 * The CardHeader contains a CardTitle with a Crown icon and the text "Top Traders".
 * The CardContent contains a div with the class "space-y-4" that maps over the mockLeaderboard array.
 * Each item in the array is rendered as a div with the class "flex items-center justify-between rounded-lg border p-3" that contains an Avatar, a div with the trader's name and rank, and a p element with the trader's profit.
 * The Avatar component displays the trader's avatar or a fallback letter if no avatar is available.
 * The profit is displayed in a p element with a class of "font-semibold" and either "text-green-600" or "text-red-600" depending on whether the profit is positive or negative.
 */
export function Leaderboard() {
  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-3">Top Traders <Crown className="text-yellow-500"/></CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockLeaderboard.map((user, index) => (
            <div
              key={user.id}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  {user.avatar ? (
                    <AvatarImage src={user.avatar} alt={user.name} />
                  ) : (
                    <AvatarFallback>
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Rank #{index + 1}
                  </p>
                </div>
              </div>
              <p
                className={`font-semibold ${
                  user.profit >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {user.profit >= 0 ? "+" : ""}
                {user.profit.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
