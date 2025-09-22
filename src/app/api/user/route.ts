import { NextRequest, NextResponse } from "next/server";

import { isAuthenticated } from "@/app/lib/auth";
import { handleHttpError } from "@/app/lib/errorResponse";

import { userService } from "./user.services";

export async function GET(request: NextRequest) {
  try {
    // const { payload } = await jwtVerify(token, secret);
    const { payload } = await isAuthenticated(request);
    // Opcional: podrías verificar si el usuario tiene el rol necesario para crear
    // if (payload.role !== 'editor') {
    //   return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    // }
    console.log("====================================");
    console.log(`User ${payload.sub} is creating an item.`);
    console.log("====================================");

    const users = await userService.getAll();
    return NextResponse.json(
      {
        success: true,
        message: "Users successfully obtained",
        data: users,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleHttpError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { payload } = await isAuthenticated(request);
    // Opcional: podrías verificar si el usuario tiene el rol necesario para crear
    // if (payload.role !== 'editor') {
    //   return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    // }
    console.log("====================================");
    console.log(`User ${payload.sub} is creating an item.`);
    console.log("====================================");
    const body = await request.json();
    const newUser = await userService.create(body);
    return NextResponse.json(
      {
        success: true,
        message: "User successfully created",
        data: newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    return handleHttpError(error);
  }
}
