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
const users = Array.from({ length: 10 }, (_, i) => ({
  mdaCommunity: ["Health", "Education", "Finance", "Agriculture", "Technology"][
    Math.floor(Math.random() * 5)
  ],
  role: ["Admin", "Member", "Moderator", "Guest", "Contributor"][
    Math.floor(Math.random() * 5)
  ],
  firstName: ["John", "Jane", "Alex", "Emily", "Chris"][
    Math.floor(Math.random() * 5)
  ],
  lastName: ["Smith", "Doe", "Johnson", "Brown", "Taylor"][
    Math.floor(Math.random() * 5)
  ],
  emailAddress: `${["John", "Jane", "Alex", "Emily", "Chris"][
    Math.floor(Math.random() * 5)
  ].toLowerCase()}.${["Smith", "Doe", "Johnson", "Brown", "Taylor"][
    Math.floor(Math.random() * 5)
  ].toLowerCase()}${i}@${
    ["example.com", "mail.com", "web.net", "test.org"][
      Math.floor(Math.random() * 4)
    ]
  }`,
  phoneNumber: `+234${Math.floor(1000000000 + Math.random() * 9000000000)}`,
  nin: `${Math.floor(10000000000 + Math.random() * 90000000000)}`,
}));

export default function UsersTable() {
  return (
    <table className="table-fixed border-collapse w-full">
      <thead>
        <tr>
          {header.map((title) => (
            <th
              className="bg-secondary text-sm  font-medium lg:font-semibold py-2 text-gray-600"
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
              mdaCommunity,
              role,
              firstName,
              lastName,
              emailAddress,
              phoneNumber,
              nin,
            },
            idx
          ) => (
            <tr key={idx} className=" text-center text-sm ">
              <td>{mdaCommunity}</td>
              <td>{role}</td>
              <td>{firstName}</td>
              <td>{lastName}</td>
              <td>{emailAddress}</td>
              <td>{phoneNumber}</td>
              <td>{nin}</td>
              <td>
                <button className="border border-gray-700 text-gray-700 font-semibold rounded-md py-2 px-4 ">
                  Edit
                </button>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
}
