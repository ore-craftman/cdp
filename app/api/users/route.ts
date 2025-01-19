import bcrypt from "bcryptjs";
import {
  setDoc,
  collection,
  getDocs,
  query,
  orderBy,
  // startAt,
  startAfter,
  limit,
  doc,
  getDoc,
  DocumentData,
  // QueryDocumentSnapshot,
  endBefore,
  limitToLast,
  getCountFromServer,
  Query,
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
  const postsPerPage = parseInt(searchParams.get("postsPerPage") || "10", 10);
  const direction = searchParams.get("direction") || "forward";
  const cursorId = searchParams.get("cursorId");

  try {
    const usersCollection = collection(db, "users");
    const totalSnapshot = await getCountFromServer(usersCollection);
    const totalCount = totalSnapshot.data().count;

    if (postsPerPage < 1) {
      return NextResponse.json(
        { message: "Invalid posts per page" },
        { status: 400 }
      );
    }

    let usersQuery: Query<DocumentData>;

    if (cursorId) {
      const cursorDocRef = doc(usersCollection, cursorId);
      const cursorSnapshot = await getDoc(cursorDocRef);

      if (!cursorSnapshot.exists()) {
        return NextResponse.json(
          { message: "Cursor document not found" },
          { status: 400 }
        );
      }

      usersQuery =
        direction === "backward"
          ? query(
              usersCollection,
              orderBy("createdAt", "asc"),
              endBefore(cursorSnapshot),
              limitToLast(postsPerPage)
            )
          : query(
              usersCollection,
              orderBy("createdAt", "asc"),
              startAfter(cursorSnapshot),
              limit(postsPerPage)
            );
    } else {
      usersQuery = query(
        usersCollection,
        orderBy("createdAt", "asc"),
        limit(postsPerPage)
      );
    }

    const querySnapshot = await getDocs(usersQuery);

    const users: IUser[] = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    const firstVisible = querySnapshot.docs.length
      ? querySnapshot.docs[0].id
      : null;
    const lastVisible = querySnapshot.docs.length
      ? querySnapshot.docs[querySnapshot.docs.length - 1].id
      : null;

    const pageCount = Math.ceil(totalCount / postsPerPage);
    const pagination = {
      totalCount,
      pageCount,
      firstVisible,
      lastVisible,
    };

    return NextResponse.json({
      message: "Users retrieved successfully",
      users,
      pagination,
    });
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error retrieving users:", error.message);
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

    // TODOO: Uncomment
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

    // TODO: Uncomment
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
