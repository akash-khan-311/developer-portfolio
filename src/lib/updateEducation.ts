export const updateEducation = async (id: string, payload: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/education/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );
    if (!res.ok) {
      throw new Error('Failed to update Education  data');
    }

    const data = await res.json();
    return {
      success: true,
      message: 'Education Data Updated Successfully',
      data: data,
    };
  } catch (error) {}
};
