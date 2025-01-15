import { NextRequest, NextResponse } from "next/server";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import db from "../../../lib/firestore/firestore";
import { UserPayload } from "../../../lib/declarations";

// get user
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { message: "User ID is required" },
      { status: 400 }
    );
  }

  try {
    const userDocRef = doc(db, "users", id);
    const userDocSnapshot = await getDoc(userDocRef);

    if (!userDocSnapshot.exists()) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const user = { id: userDocSnapshot.id, ...userDocSnapshot.data() };

    return NextResponse.json({
      message: "User retrieved successfully",
      user,
    });
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error fetching user:", error.message);
    return NextResponse.json(
      { message: "Error retrieving user", error: error.message },
      { status: 500 }
    );
  }
}

// update user
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const { id } = params;
    const updateFields: Partial<UserPayload> = await req.json();

    if (updateFields.email) {
      return NextResponse.json(
        { message: "Email cannot be updated" },
        { status: 400 }
      );
    }

    const userDocRef = doc(db, "users", id);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const updatedFields = {
      ...updateFields,
      updatedAt: new Date(),
    };

    await updateDoc(userDocRef, updatedFields);

    return NextResponse.json({
      message: "User updated successfully",
      updatedFields,
    });
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error updating user:", error.message);
    return NextResponse.json(
      { message: "Error updating user", error: error.message },
      { status: 500 }
    );
  }
}

// delete user
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const { id } = params;

    const userDocRef = doc(db, "users", id);

    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    await deleteDoc(userDocRef);

    return NextResponse.json({
      message: "User deleted successfully",
    });
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error deleting user:", error.message);
    return NextResponse.json(
      { message: "Error deleting user", error: error.message },
      { status: 500 }
    );
  }
}
