export default async function CourseAboutPage({
  params,
}: PageProps<"/courses/[courseId]/about">) {
  const { courseId } = await params;

  return <div>About course: {courseId}</div>;
}