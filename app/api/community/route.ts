import { collection, getDocs } from "firebase/firestore";
import db from "../../lib/firestore/firestore";

// get communities
export async function GET() {
  const querySnapshot = await getDocs(collection(db, "community"));
  const communities = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return Response.json({ message: "Communities retrieved", communities });
}
