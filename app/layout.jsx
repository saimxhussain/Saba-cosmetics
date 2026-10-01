import "./globals.css";
import Runtime from "../components/Runtime";
import {HEAD,TAIL} from "../lib/shell";
const LOGO="https://res.cloudinary.com/bq5gruwo/image/upload/v1790773957/Logo_without_BG.png";
export const metadata={title:"Saba Beauty Saloon · Saba Cosmetics",description:"Salon services and premium skincare products in Malir, Karachi.",icons:{icon:LOGO,apple:LOGO}};
export const viewport={width:"device-width",initialScale:1};
export default function RootLayout({children}){return(<html lang="en"><head>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
</head><body><div style={{display:"contents"}} dangerouslySetInnerHTML={{__html:HEAD}}/><main id="app">{children}</main><div style={{display:"contents"}} dangerouslySetInnerHTML={{__html:TAIL}}/><Runtime/></body></html>)}
