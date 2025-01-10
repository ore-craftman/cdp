import Button from "../button";
import Input from "../input";
import Select from "../select";

export default function MdaOfficer() {
  return (
    <form className="mt-6 flex flex-col gap-1.5s">
      <Select label="Assigned MDA">
        <option>Select MDA</option>
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

      <Button role="submit">Create User</Button>
    </form>
  );
}
