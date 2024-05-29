import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";

interface Ad {
    id: string;
    title: string;
    description: string;
    url: string;
    image: string;
    expiresAt: Date;
    clicks: number;
    createdAt: Date;
    updatedAt: Date;
}

export async function GET(): Promise<NextResponse> {
    const today = new Date();

    // Fetch ads from the database
    const ads: Ad[] = await prisma.advert.findMany();

    // Filter ads to include only those that have not expired
    const activeAds = ads.filter((ad: Ad) => ad.expiresAt >= today);

    // // Sort ads by createdAt date in descending order (latest first)
    // const sortedAds = activeAds.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    // // Retrieve only the latest ad
    // const latestAd = sortedAds.length > 0 ? [sortedAds[0]] : [];
    // console.log(latestAd);
    // Return the latest ad as a JSON response
    return NextResponse.json(activeAds);
}
