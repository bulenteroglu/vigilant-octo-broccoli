import { PensionFormInputs } from "./PensionForm/types";

export default function PensionResults({
  formData,
}: {
  formData: PensionFormInputs | null;
}) {
  return <div>{JSON.stringify(formData)}</div>;
}
