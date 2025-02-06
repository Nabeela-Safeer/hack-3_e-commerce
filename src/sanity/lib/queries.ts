import { groq } from "next-sanity";


export const allproducts = groq`*[_type == "product"]`;
export const eight = groq`*[_type == "product"][0..7]`;