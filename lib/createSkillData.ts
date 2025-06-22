import { TSkills } from '@/app/Interface/skills.interface';

export const createSkillData = async (payload: TSkills) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skills`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error('Failed to create skill data');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error creating skill data:', error);
    throw new Error('Failed to create skill data');
  }
};
