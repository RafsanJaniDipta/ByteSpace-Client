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

interface SingleCourseProps {
  course: CourseData;
}

export function SingleCourse({ course }: SingleCourseProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* Thumbnail with badges */}
      <div className="relative">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-44 object-cover"
        />
        <div className="absolute bottom-2 left-2 right-2 flex gap-1.5">
          <span className="bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
            {course.lessons} Lessons
          </span>
          <span className="bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
            {course.duration}
          </span>
          <span className="bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
            {course.comments} Comments
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-base font-bold text-gray-900 mb-1 line-clamp-2">
          {course.title}
        </h3>

        {/* Instructor */}
        <p className="text-xs text-gray-500 mb-2">by {course.instructor}</p>

        {/* Rating and level */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <span className="text-yellow-400 text-sm">★</span>
            <span className="text-xs font-medium text-gray-700">
              {course.rating}
            </span>
          </div>
          <span className="text-xs text-gray-500">{course.level}</span>
        </div>

        {/* Student avatars + count */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-xs text-white"
                style={{
                  backgroundColor: i === 1 ? "#EF4444" : i === 2 ? "#3B82F6" : i === 3 ? "#10B981" : "#F59E0B",
                }}
              >
                {i}
              </div>
            ))}
          </div>
          <span className="text-xs text-gray-500">26+</span>
        </div>

        {/* Price */}
        <div>
          <span className="text-lg font-bold text-gray-900">
            ${course.price}
          </span>
          <span className="text-xs text-gray-500">/lifetime</span>
        </div>
      </div>
    </div>
  );
}