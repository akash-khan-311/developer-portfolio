export const deleteSkill = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skills/${id}`, {
    method: 'DELETE',
  });

  return res.json();
};