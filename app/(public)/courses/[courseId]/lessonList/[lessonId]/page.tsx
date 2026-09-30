export default async function LessonPage({
  params,
}: PageProps<"/courses/[courseId]/lessonList/[lessonId]">) {
  const { courseId, lessonId } = await params;

  return (
    <div>
      Lesson: {lessonId} (course: {courseId})
    </div>
  );
}
