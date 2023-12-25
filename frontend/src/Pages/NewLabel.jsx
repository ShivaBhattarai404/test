import { json } from "react-router-dom";
import AddLabel from "../Components/Label/AddLabel/AddLabel";

const NewLabel = () => {
  return <AddLabel />;
};

export const action = async ({ params, request }) => {
  const formData = await request.formData();
  const name = formData.get("labelName");
  const budget = formData.get("labelBudget");

  console.log({name, budget});
  return json({name, budget})
};


export default NewLabel;