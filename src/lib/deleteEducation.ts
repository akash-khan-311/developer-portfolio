export const deleteEducationFromDB = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/education/${id}`,
    {
      method: 'DELETE',
    }
  );

  return res.json();
};
