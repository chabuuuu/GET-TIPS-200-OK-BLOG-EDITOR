import { writeFile } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  const directory = process.env.NEXT_PUBLIC_DIRECTORY || "public/images";
  const rootUrl = process.env.NEXT_PUBLIC_ROOT_URL || "/images/";

  if (!file || !file.name) {
    return NextResponse.json({ error: "File not provided" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path.join(process.cwd(), directory, fileName);

  console.log(`Saving file to ${filePath}`);

  // Đảm bảo thư mục tồn tại
  await fs.promises.mkdir(path.dirname(filePath), { recursive: true });

  await writeFile(filePath, buffer);

  return NextResponse.json({
    link: `${rootUrl}${fileName}`,
  });
}
