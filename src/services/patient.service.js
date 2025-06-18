import prisma from '../config/db.js';
import { ErrorResponse } from '../lib/error.res.js';

export const createPatient = async (userId, data) => {
  const { name, age, gender, address, contact, disease } = data;

  if (!name || !age || !gender || !address || !contact || !disease) {
    throw ErrorResponse.badRequest('All patient fields are required');
  }

  const patient = await prisma.patient.create({
    data: {
      name,
      age,
      gender,
      address,
      contact,
      disease,
      userId,
      createdBy: userId,
    },
  });

  return patient;
};

export const getAllPatients = async (userId) => {
  return await prisma.patient.findMany({
    where: { createdBy: userId },
  });
};

export const getPatientById = async (id, userId) => {
  const patient = await prisma.patient.findUnique({ where: { id } });

  if (!patient) throw ErrorResponse.notFound('Patient not found');
  if (patient.createdBy !== userId) throw ErrorResponse.forbidden('Unauthorized access');

  return patient;
};

export const updatePatient = async (id, userId, data) => {
  const patient = await prisma.patient.findUnique({ where: { id } });

  if (!patient) throw ErrorResponse.notFound('Patient not found');
  if (patient.createdBy !== userId) throw ErrorResponse.forbidden('Unauthorized access');

  return await prisma.patient.update({
    where: { id },
    data,
  });
};

export const deletePatient = async (id, userId) => {
  const patient = await prisma.patient.findUnique({ where: { id } });

  if (!patient) throw ErrorResponse.notFound('Patient not found');
  if (patient.createdBy !== userId) throw ErrorResponse.forbidden('Unauthorized access');

  return await prisma.patient.delete({ where: { id } });
};
