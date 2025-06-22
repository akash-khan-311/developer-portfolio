export const deleteExperience = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/experience/${id}`, {
    method: 'DELETE',
  });

  return res.json();
};