import { Course } from "@/app/(dashboard)/dashboard/courses/_types/courses.type";
import { unauthorized } from "next/navigation";
import { getSession } from "@/lib/utils/session.utils";

async function getCourses(): Promise<Course[]> {
  const session = await getSession();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/identity/courses`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session.accessToken}`,
      },
    },
  );

  if (response.status === 401) {
    unauthorized();
  }

  return await response.json();
}

export default async function CoursesPage() {
  const courses = await getCourses();
  return (
    <>
      <ul className={"lg:m-14 list-disc"}>
        {courses.map((course) => (
          <li className={"my-4 text-lg"} key={`course-${course.title}`}>
            {course.title}
          </li>
        ))}
      </ul>
    </>
  );
}
