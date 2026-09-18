import type { Localized } from "@/lib/i18n";
export type Exercise={type:"square"|"move"|"choice";fen:string;instruction:Localized;answer:string;hint:Localized;success:Localized;error:Localized;explanation:Localized};
export type Lesson={id:string;order:number;topic:string;title:Localized;description:Localized;objectives:Localized<string[]>;intro:Localized;exercise:Exercise};
