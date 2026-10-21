import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const targetUrl = searchParams.get("url");

  if (!targetUrl || !targetUrl.startsWith("https://cdn.sanity.io/")) {
    return new NextResponse("Invalid image URL", { status: 400 });
  }

  try {
    const upstreamRes = await fetch(targetUrl, {
      headers: {
        // Assure que Sanity renvoie l'image correctement
        Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
      },
    });

    if (!upstreamRes.ok) {
      return new NextResponse("Upstream error", { status: upstreamRes.status });
    }

    const contentType =
      upstreamRes.headers.get("content-type") || "image/webp";
    const imageBuffer = await upstreamRes.arrayBuffer();

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Proxy image error:", error);
    return new NextResponse("Failed to proxy image", { status: 500 });
  }
}
