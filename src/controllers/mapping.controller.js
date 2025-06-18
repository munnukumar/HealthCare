import {
    assignDoctorToPatient,
    getAllMappings,
    getDoctorsOfPatient,
    removeDoctorFromPatient,
  } from '../services/mapping.service.js';
  
  import { SuccessResponse } from '../lib/success.res.js';
  import { ErrorResponse } from '../lib/error.res.js';
  
  export const assignDoctor = async (req, res, next) => {
    try {
      const { patientId, doctorId } = req.body;
  
      if (!patientId || !doctorId) {
        throw ErrorResponse.badRequest('Patient ID and Doctor ID are required');
      }
  
      const mapping = await assignDoctorToPatient(patientId, doctorId);
      return SuccessResponse.created(res, mapping, 'Doctor assigned to patient successfully');
    } catch (error) {
      next(error instanceof ErrorResponse ? error : ErrorResponse.internalServerError(error.message));
    }
  };
  
  export const getMappings = async (req, res, next) => {
    try {
      const mappings = await getAllMappings();
      return SuccessResponse.ok(res, mappings, 'All mappings retrieved successfully');
    } catch (error) {
      next(error instanceof ErrorResponse ? error : ErrorResponse.internalServerError(error.message));
    }
  };
  
  export const getPatientDoctors = async (req, res, next) => {
    try {
      const { patientId } = req.params;
      const result = await getDoctorsOfPatient(patientId);
      return SuccessResponse.ok(res, result, 'Doctors assigned to the patient retrieved successfully');
    } catch (error) {
      next(error instanceof ErrorResponse ? error : ErrorResponse.internalServerError(error.message));
    }
  };
  
  export const removeMapping = async (req, res, next) => {
    try {
      const deleted = await removeDoctorFromPatient(req.params.id);
      return SuccessResponse.ok(res, deleted, 'Doctor removed from patient successfully');
    } catch (error) {
      next(error instanceof ErrorResponse ? error : ErrorResponse.internalServerError(error.message));
    }
  };
  