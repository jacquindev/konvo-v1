import { OrganizationList } from "@clerk/nextjs";

export const OrgSelectView = () => {
  return (
    <OrganizationList
      afterCreateOrganizationUrl="/dashboard"
      afterSelectPersonalUrl="/dashboard"
      hidePersonal
      skipInvitationScreen
    />
  );
};
