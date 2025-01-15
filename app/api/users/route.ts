import bcrypt from "bcryptjs";
import {
  setDoc,
  collection,
  getDocs,
  query,
  orderBy,
  startAfter,
  limit,
  doc,
  getDoc,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import db from "../../lib/firestore/firestore";
import { NextRequest, NextResponse } from "next/server";
import { IUser } from "../../lib/declarations";
import transporter from "../../lib/mail/transporter";
import { User, UserPayload } from "../../lib/declarations";
import SignupTemplate from "../../lib/mail/templates/sign-up";
import generatePass from "../../lib/generatePass";

// Get users
export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
  const lastVisibleId = searchParams.get("lastVisible");

  try {
    const usersCollection = collection(db, "users");

    let usersQuery = query(
      usersCollection,
      orderBy("createdAt", "asc"),
      limit(pageSize)
    );

    // pagination
    if (lastVisibleId) {
      const lastVisibleDocRef = doc(db, "users", lastVisibleId);
      const lastDocSnapshot = await getDoc(lastVisibleDocRef);
      if (lastDocSnapshot.exists()) {
        usersQuery = query(
          usersCollection,
          orderBy("created_time", "asc"),
          startAfter(lastDocSnapshot),
          limit(pageSize)
        );
      }
    }

    const querySnapshot = await getDocs(usersQuery);

    const users: IUser[] = querySnapshot.docs.map(
      (doc: QueryDocumentSnapshot<DocumentData>) => ({
        ...doc.data(),
        id: doc.id,
      })
    );

    const nextPageToken =
      querySnapshot.docs.length > 0
        ? querySnapshot.docs[querySnapshot.docs.length - 1].id
        : null;

    return NextResponse.json({
      message: "Users retrieved successfully",
      users,
      nextPageToken,
    });
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error retrieving users", error: error.message },
      { status: 500 }
    );
  }
}

// Create User
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const data: UserPayload = await req.json();

    if (!data.email || !data.firstName || !data.lastName || !data.type) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const userDocRef = doc(collection(db, "users"), data.email);
    const existingUserDoc = await getDoc(userDocRef);

    if (existingUserDoc.exists()) {
      return NextResponse.json(
        { message: "Account with this email already exists" },
        { status: 409 }
      );
    }

    const defaultPassword = generatePass();

    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    const user: User = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
      verifiedEmail: false,
      password: hashedPassword,
    };

    await setDoc(userDocRef, user);

    await transporter.sendMail({
      from: "noreply@demomailtrap.com",
      to: user.email,
      subject: "Account Created - Please Verify Your Email",
      html: SignupTemplate({
        firstName: user.firstName,
        role: user.role,
        password: defaultPassword,
        email: user.email,
      }),
    });

    return NextResponse.json({
      message: "User created successfully. Verification email sent.",
      user: { ...user, password: undefined },
    });
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error creating user:", error.message);
    return NextResponse.json(
      { message: "Error creating user", error: error.message },
      { status: 500 }
    );
  }
}
