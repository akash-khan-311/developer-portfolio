import { TExperience } from '@/app/Interface/experience.interface';

export const createExperience = async ({
  company,
  role,
  startDate,
  endDate,
}: TExperience) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/experience`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          company,
          role,
          startDate,
          endDate,
        }),
      }
    );
    if (!res.ok) {
      throw new Error('Failed to create experience data');
    }
    const data = await res.json();
    return  data;
  } catch (error) {
    console.error('Error creating experience:', error);
    throw new Error('Failed to create experience');
  }
};
