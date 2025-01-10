import { Fragment } from "react";
import Searchbar from "../ui/searchbar";
import Button from "../ui/button";
import UsersTable from "../ui/users-table";
import Pagination from "../ui/pagination";
import Link from "next/link";

// import { useRouter } from "next/navigation";

export default function Page() {
  // const router = useRouter();

  return (
    <Fragment>
      <div className="flex flex-row items-center justify-between gap-2 lg:gap-4 mb-4">
        <div className="grow ">
          <Searchbar />
        </div>

        <div>
          <Button>
            <Link href="/user-management/create-new-user">Add new user</Link>
          </Button>
        </div>
      </div>

      <UsersTable />
      <Pagination />
    </Fragment>
  );
}
