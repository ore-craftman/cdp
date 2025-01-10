"use client";
import { useState } from "react";
import { userRoles } from "../../lib/constants";
import FormTabs from "../../ui/form-tabs";

export default function CreateNewUser() {
  const [selectedRole, setSelectedRole] = useState(userRoles[0]);
  return (
    <div>
      <h2 className="mt-10">
        Choose a role to proceed with the required details.
      </h2>

      {/* Tab header */}
      <div className="mt-4 text-sm font-medium text-center text-gray-500  dark:text-gray-400 ">
        <ul className="flex flex-wrap -mb-px">
          {userRoles.map((role, idx) => {
            return (
              <li className="me-2" key={idx}>
                <button
                  className={`inline-block p-4 rounded-t-lg hover:text-gray-600 dark:hover:text-gray-300 ${
                    selectedRole === role &&
                    " border-b-4 border-primary active "
                  }`}
                  aria-current={selectedRole === role && "page"}
                  onClick={() => setSelectedRole(role)}
                >
                  {role}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Tab Body */}
      <FormTabs selectedRole={selectedRole} />
    </div>
  );
}
