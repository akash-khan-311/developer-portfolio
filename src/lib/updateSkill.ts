type Props = {
  id: string;
  payload: { name: string; icon: string };
};
export const updateSkill = async ({ id, payload }: Props) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/skills/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    if (!res.ok) {
      throw new Error("Failed to update Skill data");
    }

    const data = await res.json();
    return {
      success: true,
      message: "Skill Data Updated Successfully",
      data: data,
    };
  } catch (error) {
    console.error("Error updating About data:", error);
    const message =
      error instanceof Error
        ? error.message
        : String(error) || "Something went wrong";
    return {
      success: false,
      message: message,
      data: null,
    };
  }
};
