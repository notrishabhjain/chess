import { defaultProgress, type ProgressState } from "@/lib/progress/model";
const key="chessmentor-progress-v1";
export interface ProgressRepository { load():ProgressState; save(progress:ProgressState):void; }
export const localProgressRepository:ProgressRepository={load(){if(typeof window==="undefined")return defaultProgress;try{return {...defaultProgress,...JSON.parse(localStorage.getItem(key)??"{}")};}catch{return defaultProgress;}},save(progress){localStorage.setItem(key,JSON.stringify(progress));}};
