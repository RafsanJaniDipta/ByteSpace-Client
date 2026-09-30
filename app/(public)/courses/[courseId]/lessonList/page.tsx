export default async function CourseLessonListPage({
  params,
}: PageProps<"/courses/[courseId]/lessonList">) {
  const { courseId } = await params;

  return <div>Lessons for course: {courseId}</div>;
}
