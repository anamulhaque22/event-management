import EditAttendee from "@/components/Attendee/EditAttendee/EditAttendee";
import { useRouter } from "next/router";

const EditAttendeePage = () => {
  const router = useRouter();
  return (
    <>
      <EditAttendee attendeeId={router.query.attendeeId} />
    </>
  );
};

export default EditAttendeePage;
