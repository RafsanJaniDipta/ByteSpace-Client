export default async function SingleCoursePage({
  params,
}: PageProps<"/courses/[courseId]">) {
  const { courseId } = await params;

  return <div>SingleCoursePage: {courseId}</div>;
}