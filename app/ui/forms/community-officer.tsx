import { useMutation, useQuery } from "@tanstack/react-query";
import Button from "../button";
import Input from "../input";
import Select from "../select";
import { endpoints } from "../../lib/constants";
import { httpHandler } from "../../lib/http";
import Loader, { Spinner } from "../loader";
import { UserPayload } from "../../lib/declarations";
import { FormEvent } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function CommunityOfficer() {
  const router = useRouter();
  const { data: communityData, isLoading } = useQuery({
    queryKey: ["communities"],
    queryFn: () =>
      httpHandler({
        url: endpoints.GET_COMMUNITIES,
        method: "get",
      }),
  });

  const { mutate, isPending, isError, isSuccess, data, error } = useMutation({
    mutationFn: (data: UserPayload) =>
      httpHandler({ data, url: endpoints.CREATE_USER, method: "post" }),
  });

  async function submitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const payload = {
      type: "CO",
      email: data["email-address"].toString(),
      firstName: data["first-name"].toString(),
      lastName: data["last-name"].toString(),
      phoneNumber: data["phone-number"].toString(),
      nin: data["national-identification-number-(nin)"].toString(),
      role: data["community-role"].toString(),
      assignedCommunity: data["assigned-community"].toString(),
    };

    mutate(payload);
  }

  if (isSuccess) {
    toast.success("Users created successfully");
    router.push("/user-management");
  }

  if (isError) {
    /* eslint-disable @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    const { response } = error;
    toast.error(response?.data?.message ?? "Error creating user");

    console.log({ error, data });
  }

  if (!communityData?.data?.communities || isLoading) return <Loader />;

  const communities = communityData?.data?.communities.map(
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    (community: any) => community?.name
  );

  return (
    <form className="mt-6 flex flex-col gap-1.5" onSubmit={submitHandler}>
      <Select label="Community Role">
        <option disabled>Select role</option>
        {["Coordinator", "Supervisor"].map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </Select>

      <Select label="Assigned Community">
        <option disabled>Select community</option>

        {communities.map((community: string) => (
          <option key={community}>{community}</option>
        ))}
      </Select>

      <Input
        type="email"
        placeholder="Enter user email address"
        label="Email Address"
        required
      />

      <div className="flex items-center justify-between gap-2 lg:gap-6 ">
        <div className="grow">
          <Input
            type="text"
            placeholder="Enter user first name"
            label="First Name"
            required
          />
        </div>
        <div className="grow">
          <Input
            type="text"
            placeholder="Enter user last name"
            label="Last Name"
            required
          />
        </div>
      </div>

      <div className="flex items-end justify-between gap-2 lg:gap-6 mb-6">
        <div className="w-full lg:w-[49%]">
          <Input
            type="tel"
            placeholder="Enter user phone number"
            label="Phone Number"
            required
          />
        </div>
        <div className="w-full lg:w-[49%]">
          <Input
            type="text"
            placeholder="Enter user NIN"
            label="National Identification Number (NIN)"
            required
          />
        </div>
      </div>

      <Button role="submit" disabled={isPending}>
        {isPending && <Spinner />}
        {isPending ? "Loading..." : "Create User"}
      </Button>
    </form>
  );
}
