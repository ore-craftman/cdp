import CommunityOfficer from "./forms/community-officer";
import MdaOfficer from "./forms/mda-officer";
import ProjectDevOfficer from "./forms/pdo";
import Spime from "./forms/spime";

export default function FormTabs({ selectedRole }: { selectedRole: string }) {
  // Not using && operator in the ternaries below to ensure only required components are mounted
  return (
    <div>
      {selectedRole === "SPIME" ? <Spime /> : null}
      {selectedRole === "Community Officer (CO)" ? <CommunityOfficer /> : null}
      {selectedRole === "MDA Officer" ? <MdaOfficer /> : null}
      {selectedRole === "Project Development Officer (PDO)" ? (
        <ProjectDevOfficer />
      ) : null}
    </div>
  );
}
