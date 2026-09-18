import {notFound} from "next/navigation";import {getLesson} from "@/lib/curriculum/lessons";import {LessonPlayer} from "@/components/lessons/lesson-player";
export default async function LessonPage({params}:{params:Promise<{lessonId:string}>}){const lesson=getLesson((await params).lessonId);if(!lesson)notFound();return <main className="shell page"><LessonPlayer lesson={lesson}/></main>}
