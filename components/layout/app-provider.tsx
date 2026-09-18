"use client";
import { createContext,useContext,useEffect,useState } from "react";
import { localProgressRepository } from "@/lib/persistence/progress-store";
import { defaultProgress,type ProgressState } from "@/lib/progress/model";
const Ctx=createContext<{progress:ProgressState;update:(fn:(p:ProgressState)=>ProgressState)=>void}>({progress:defaultProgress,update:()=>undefined});
export function AppProvider({children}:{children:React.ReactNode}){const [progress,setProgress]=useState(defaultProgress);useEffect(()=>setProgress(localProgressRepository.load()),[]);const update=(fn:(p:ProgressState)=>ProgressState)=>setProgress(p=>{const next=fn(p);localProgressRepository.save(next);return next;});return <Ctx.Provider value={{progress,update}}>{children}</Ctx.Provider>};export const useApp=()=>useContext(Ctx);
