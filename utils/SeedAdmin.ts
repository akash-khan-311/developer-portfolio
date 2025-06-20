// /utils/SeedAdmin.ts
import bcrypt from 'bcrypt';
import Admin from '@/app/models/Admin.model';
import { connectDB } from '@/app/lib/db';

export const seedAdmin = async () => {
  await connectDB();
  const existing = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
  if (!existing) {
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD!, 10);
    await Admin.create({
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
    });
    console.log('Admin seeded');
  }
};
