import EditEvent from "@/components/Event/EditEvent";
import { useRouter } from "next/router";

const EditEventPage = () => {
  const router = useRouter();
  return (
    <>
      <EditEvent eventId={router.query.eventId} />
    </>
  );
};

export default EditEventPage;
