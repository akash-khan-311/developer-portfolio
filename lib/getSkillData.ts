export const getSkillData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skills`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch skill data');
  }
  const data = await res.json();
  return data;
};
