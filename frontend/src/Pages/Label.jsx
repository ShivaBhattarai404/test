import React from 'react'
import { json, useParams } from 'react-router-dom'

import LabelComponent from "../Components/Label/Label";

const Label = () => {
  const { labelId } = useParams();
  return (
    <LabelComponent id={labelId}/>
  )
}


export const action = async ({params, request:req})=>{
  const formData = await req.formData();
  const name = formData.get('name');
  return json({name: name});
}

export default Label