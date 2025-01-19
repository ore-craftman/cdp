"use client";

import { useState } from "react";
import Searchbar from "../ui/searchbar";
import Button from "../ui/button";
import UsersTable from "../ui/users-table";
import Pagination from "../ui/pagination";
import Link from "next/link";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { httpHandler } from "../lib/http";
import { endpoints } from "../lib/constants";
import Loader from "../ui/loader";
// import { User } from "../lib/declarations";

export default function Page() {
  const POST_PER_PAGE = 10;
  const [page, setPage] = useState(1);

  const [queryConfig, setQueryConfig] = useState({ direction: "", cursor: "" });

  const { data, isLoading, isError, error, isFetching, isPlaceholderData } =
    useQuery({
      queryKey: ["users", page],
      queryFn: () =>
        httpHandler({
          url: endpoints.GET_USERS(
            page,
            queryConfig.direction,
            queryConfig.cursor,
            POST_PER_PAGE
          ),
          method: "get",
        }),

      placeholderData: keepPreviousData,
    });

  if (isLoading || isFetching) return <Loader />;

  if (isError) {
    console.error("ERR: ", error);
  }

  return (
    <div className="relative min-h-[75vh]">
      <div className="flex flex-row items-center justify-between gap-2 lg:gap-4 mb-4 ">
        <div className="grow ">
          <Searchbar />
        </div>

        <div>
          <Button>
            <Link href="/user-management/create-new-user">Add new user</Link>
          </Button>
        </div>
      </div>

      <UsersTable users={data?.data.users} />
      {data?.data.pagination && (
        <Pagination
          pagination={data?.data.pagination}
          currentPage={page}
          setCurrentPage={setPage}
          isPlaceholderData={isPlaceholderData}
          setQueryConfig={setQueryConfig}
        />
      )}
    </div>
  );
}
