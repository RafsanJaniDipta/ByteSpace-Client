import { SingleCourse } from "./singleCourse";

interface CourseData {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  lessons: number;
  duration: string;
  comments: number;
  rating: number;
  level: string;
  price: number;
  students?: number;
}

interface CourseGroupProps {
  title?: string;
  courses: CourseData[];
}

export function CourseGroup({ title, courses }: CourseGroupProps) {
  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {title}
          </h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <SingleCourse key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}