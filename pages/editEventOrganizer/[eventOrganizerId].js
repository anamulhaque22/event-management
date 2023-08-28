import EditEventOrganizer from "@/components/EventOrganizer/EditEventOrganizer/EditEventOrganizer";
import { useRouter } from "next/router";

const EditEventOrganizerPage = () => {
  const router = useRouter();
  return (
    <>
      <EditEventOrganizer eventOrganizerId={router.query.eventOrganizerId} />
    </>
  );
};

export default EditEventOrganizerPage;
