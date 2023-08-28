import InputFile from "../Input/InputFile";
import InputText from "../Input/InputText";
import TitleCard from "../shared/TitleCard";

function ProfileSettings() {
  const updateFormValue = ({ updateType, value }) => {
    console.log(updateType);
  };

  return (
    <>
      <TitleCard title="Profile Settings" topMargin="mt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputText
            labelTitle="Name"
            defaultValue="Alex"
            updateFormValue={updateFormValue}
          />
          <InputText
            labelTitle="Email"
            defaultValue="alex@dashwind.com"
            updateFormValue={updateFormValue}
          />
          <InputText
            labelTitle="Address"
            defaultValue="Kuril Dhaka"
            updateFormValue={updateFormValue}
          />
          <InputText
            labelTitle="Phone"
            defaultValue="+8801946988218"
            updateFormValue={updateFormValue}
          />
          <InputText
            labelTitle="Date Of Birth"
            defaultValue="YYYY-MM-DD"
            placeholder="YYYY-MM-DD"
            type="date"
            updateFormValue={updateFormValue}
          />
          <InputFile labelTitle="Profile Picture" type={"file"} />
        </div>
      </TitleCard>
    </>
  );
}

export default ProfileSettings;
