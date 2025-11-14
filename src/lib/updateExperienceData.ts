type Props = {
  id: string;
  payload: {
    company: string;
    role: string;
    startDate: string;
    endDate: string;
  };
};

export const updateExperienceData = async ({ id, payload }: Props) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/experience/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      throw new Error("Failed to update hero data");
    }

    const data = await res.json();
    return {
      success: true,
      message: "Hero Data Updated Successfully",
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
