export type LessonProgress={status:"not_started"|"in_progress"|"completed"; mastery:number; attempts:number; updatedAt:string};
export type ProgressState={locale:"en"|"hi"; onboardingComplete:boolean; level:number; lessons:Record<string,LessonProgress>};
export const defaultProgress:ProgressState={locale:"en",onboardingComplete:false,level:1,lessons:{}};
export const completedCount=(progress:ProgressState)=>Object.values(progress.lessons).filter(x=>x.status==="completed").length;
export const nextLessonId=(progress:ProgressState,ids:string[])=>ids.find(id=>progress.lessons[id]?.status!=="completed")??ids[ids.length-1];
