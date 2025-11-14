import { TProject } from "@/Interface/project.interface";

export const createProjectData = async (payload: TProject) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Failed to create project data");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error creating project data:", error);
    throw new Error("Failed to create project data");
  }
};
