import { collection, getDocs } from "firebase/firestore";
import db from "../../lib/firestore/firestore";

// get MDAs
export async function GET() {
  const querySnapshot = await getDocs(collection(db, "mda"));
  const mdas = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return Response.json({ message: "MDAs retrieved", mdas });
}
