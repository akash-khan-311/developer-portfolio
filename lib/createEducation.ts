import { TEducation } from '@/app/Interface/education.interface';

export const createEducationData = async (payload: TEducation) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/education`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      throw new Error('Failed to create education data');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error creating education data:', error);
    throw new Error('Failed to create education data');
  }
};
