import prisma from '../config/db.js';
import { ErrorResponse } from '../lib/error.res.js';

export const createDoctor = async (userId, data) => {
  const { name, specialization, contact, experience } = data;

  if (!name || !specialization || !contact || !experience) {
    throw ErrorResponse.badRequest('All doctor fields are required');
  }

  try {
    const doctor = await prisma.doctor.create({
      data: {
        name,
        specialization,
        contact,
        experience,
        createdBy: userId,
      },
    });
    return doctor;
  } catch (err) {
    throw ErrorResponse.internalServerError('Failed to create doctor');
  }
};

export const getAllDoctors = async () => {
  try {
    return await prisma.doctor.findMany();
  } catch (err) {
    throw ErrorResponse.internalServerError('Failed to fetch doctors');
  }
};

export const getDoctorById = async (id) => {
  const doctor = await prisma.doctor.findUnique({ where: { id } });
  if (!doctor) throw ErrorResponse.notFound('Doctor not found');
  return doctor;
};

export const updateDoctor = async (id, userId, data) => {
  const doctor = await prisma.doctor.findUnique({ where: { id } });
  if (!doctor) throw ErrorResponse.notFound('Doctor not found');
  if (doctor.createdBy !== userId) throw ErrorResponse.unauthorized('Unauthorized access');

  try {
    return await prisma.doctor.update({
      where: { id },
      data,
    });
  } catch (err) {
    throw ErrorResponse.internalServerError('Failed to update doctor');
  }
};

export const deleteDoctor = async (id, userId) => {
  const doctor = await prisma.doctor.findUnique({ where: { id } });
  if (!doctor) throw ErrorResponse.notFound('Doctor not found');
  if (doctor.createdBy !== userId) throw ErrorResponse.unauthorized('Unauthorized access');

  try {
    return await prisma.doctor.delete({ where: { id } });
  } catch (err) {
    throw ErrorResponse.internalServerError('Failed to delete doctor');
  }
};
