import "./globals.css";import {Header} from "@/components/layout/header";import {AppProvider} from "@/components/layout/app-provider";
export const metadata={title:"ChessMentor | Learn chess with confidence",description:"A bilingual chess learning companion."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><AppProvider><Header/>{children}</AppProvider></body></html>}
