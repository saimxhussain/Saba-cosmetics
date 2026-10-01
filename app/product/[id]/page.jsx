import Html from "../../../components/Html";
import {T,P} from "../../../lib/pages";
export const generateStaticParams=()=>P.map(p=>({id:p.id}));
export async function generateMetadata({params}){const {id}=await params;const p=P.find(x=>x.id===id);return {title:(p?p.n:"Product")+" · Saba Cosmetics"}}
export default async function Page({params}){const {id}=await params;return <Html h={T.product(id)}/>}
