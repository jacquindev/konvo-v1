import { OrganizationList } from "@clerk/nextjs";

export const OrgSelectView = () => {
  return (
    <OrganizationList
      afterCreateOrganizationUrl="/dashboard"
      afterSelectOrganizationUrl="/dashboard"
      hidePersonal
      skipInvitationScreen
    />
  );
};
