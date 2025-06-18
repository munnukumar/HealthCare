import prisma from '../config/db.js';
import { ErrorResponse } from '../lib/error.res.js';

export const assignDoctorToPatient = async (patientId, doctorId) => {
  const patient = await prisma.patient.findUnique({ where: { id: patientId } });
  if (!patient) throw ErrorResponse.notFound('Patient not found');

  const doctor = await prisma.doctor.findUnique({ where: { id: doctorId } });
  if (!doctor) throw ErrorResponse.notFound('Doctor not found');

  const existingMapping = await prisma.mapping.findFirst({
    where: { patientId, doctorId },
  });
  if (existingMapping) throw ErrorResponse.conflict('Doctor already assigned to this patient');

  return await prisma.mapping.create({
    data: { patientId, doctorId },
  });
};

export const getAllMappings = async () => {
  return await prisma.mapping.findMany({
    include: {
      patient: true,
      doctor: true,
    },
  });
};

export const getDoctorsOfPatient = async (patientId) => {
  const patient = await prisma.patient.findUnique({ where: { id: patientId } });
  if (!patient)
    throw ErrorResponse.notFound('No patient available with given patient ID. Please provide correct patient ID.');

  const mappings = await prisma.mapping.findMany({
    where: { patientId },
    include: {
      doctor: true,
    },
  });

  if (!mappings || mappings.length === 0) {
    return {
      message: 'No doctor assigned to this patient.',
      patient,
    };
  }

  return {
    patient,
    doctors: mappings.map((m) => m.doctor),
  };
};

export const removeDoctorFromPatient = async (mappingId) => {
  const mapping = await prisma.mapping.findUnique({ where: { id: mappingId } });
  if (!mapping) throw ErrorResponse.notFound('Mapping not found');

  return await prisma.mapping.delete({ where: { id: mappingId } });
};
