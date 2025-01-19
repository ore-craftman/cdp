import { useMutation, useQuery } from "@tanstack/react-query";
import Button from "../button";
import Input from "../input";
import Select from "../select";
import { httpHandler } from "../../lib/http";
import { endpoints } from "../../lib/constants";
import Loader, { Spinner } from "../loader";
import { useRouter } from "next/navigation";
import { UserPayload } from "../../lib/declarations";
import { FormEvent } from "react";
import { toast } from "react-toastify";

export default function MdaOfficer() {
  const router = useRouter();
  const { data: mdaData, isLoading } = useQuery({
    queryKey: ["communities"],
    queryFn: () =>
      httpHandler({
        url: endpoints.GET_MDA,
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
      type: "MDA",
      email: data["email-address"].toString(),
      firstName: data["first-name"].toString(),
      lastName: data["last-name"].toString(),
      phoneNumber: data["phone-number"].toString(),
      nin: data["national-identification-number-(nin)"].toString(),
      role: "MDA",
      assignedMda: data["assigned-mda"].toString(),
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

  if (!mdaData?.data?.mdas || isLoading) return <Loader />;

  const mdas = mdaData?.data?.mdas.map(
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    (mda: any) => mda?.name
  );

  return (
    <form className="mt-6 flex flex-col gap-1.5s" onSubmit={submitHandler}>
      <Select label="Assigned MDA">
        <option disabled>Select MDA</option>
        {mdas.map((mda: string) => (
          <option key={mda}>{mda}</option>
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
