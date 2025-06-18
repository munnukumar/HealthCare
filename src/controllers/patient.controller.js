import {
    createPatient,
    getAllPatients,
    getPatientById,
    updatePatient,
    deletePatient,
  } from '../services/patient.service.js';
  
  import { SuccessResponse } from '../lib/success.res.js';
  import { ErrorResponse } from '../lib/error.res.js';
  
  export const addPatient = async (req, res, next) => {
    try {
      if (!req.user?.id) {
        throw ErrorResponse.unauthorized('User not authenticated');
      }
  
      const patient = await createPatient(req.user.id, req.body);
      return SuccessResponse.created(res, patient, 'Patient created successfully');
    } catch (error) {
      next(error);
    }
  };
  
  export const getPatients = async (req, res, next) => {
    try {
      if (!req.user?.id) {
        throw ErrorResponse.unauthorized('User not authenticated');
      }
  
      const patients = await getAllPatients(req.user.id);
      console.log("patients :", patients)
      return SuccessResponse.ok(res, patients, 'All patients fetched successfully');
    } catch (error) {
      next(error);
    }
  };
  
  export const getPatient = async (req, res, next) => {
    try {
      if (!req.user?.id) {
        throw ErrorResponse.unauthorized('User not authenticated');
      }
  
      const patient = await getPatientById(req.params.id, req.user.id);
      if (!patient) {
        throw ErrorResponse.notFound('Patient not found');
      }
  
      return SuccessResponse.ok(res, patient, 'Patient fetched successfully');
    } catch (error) {
      next(error);
    }
  };
  
  export const editPatient = async (req, res, next) => {
    try {
      if (!req.user?.id) {
        throw ErrorResponse.unauthorized('User not authenticated');
      }
  
      const updated = await updatePatient(req.params.id, req.user.id, req.body);
      return SuccessResponse.ok(res, updated, 'Patient updated successfully');
    } catch (error) {
      next(error);
    }
  };
  
  export const removePatient = async (req, res, next) => {
    try {
      if (!req.user?.id) {
        throw ErrorResponse.unauthorized('User not authenticated');
      }
  
      const deleted = await deletePatient(req.params.id, req.user.id);
      return SuccessResponse.ok(res, deleted, 'Patient deleted successfully');
    } catch (error) {
      next(error);
    }
  };
  