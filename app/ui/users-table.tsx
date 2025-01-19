import Link from "next/link";
import { User } from "../lib/declarations";

const header = [
  "MDA/Community",
  "Role",
  "First Name",
  "Last Name",
  "Email Address",
  "Phone Number",
  "NIN",
  "Action",
];

export default function UsersTable({ users }: { users: User[] }) {
  return (
    <table className="table-fixed border-collapse w-full">
      <thead>
        <tr>
          {header.map((title) => (
            <th
              className="bg-secondary text-sm  font-medium lg:font-semibold py-2 text-gray-600  w-[12.5%] "
              key={title}
            >
              {title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {users.map(
          (
            {
              communityRole,
              role,
              firstName,
              lastName,
              email,
              phoneNumber,
              nin,
            },
            idx
          ) => (
            <tr key={idx} className=" text-sm  text-center">
              <td className="w-[12.5%]">
                {communityRole ? communityRole : "N/A"}
              </td>
              <td className="w-[12.5%]">{role}</td>
              <td className="w-[12.5%]">{firstName}</td>
              <td className="w-[12.5%]">{lastName}</td>
              <td className="w-[12.5%]">
                {email.length > 10 ? email.slice(0, 10) + "..." : email}
              </td>
              <td className="w-[12.5%]">{phoneNumber}</td>
              <td className="w-[12.5%]">{nin}</td>
              <td className="w-[12.5%]">
                <Link href={"/"}>
                  <p className="border border-gray-700 text-gray-700 font-semibold rounded-md p-1.5 ">
                    Edit
                  </p>
                </Link>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
}
