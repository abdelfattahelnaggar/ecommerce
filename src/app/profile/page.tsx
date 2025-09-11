import React from "react";
import getMyToken  from "@/utilities/token";
const page = async () => {
  const token = await getMyToken();
  console.log(token);
  return <div>page</div>;
};

export default page;
