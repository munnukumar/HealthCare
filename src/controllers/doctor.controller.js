import {
    createDoctor,
    getAllDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor,
  } from '../services/doctor.service.js';
  
  import { SuccessResponse } from '../lib/success.res.js';
  import { ErrorResponse } from '../lib/error.res.js';
  
  export const addDoctor = async (req, res, next) => {
    try {
      if (!req.user?.id) {
        throw ErrorResponse.unauthorized('Unauthorized access');
      }
  
      const doctor = await createDoctor(req.user.id, req.body);
      return SuccessResponse.created(res, doctor, 'Doctor created successfully');
    } catch (error) {
      next(error instanceof ErrorResponse ? error : ErrorResponse.internalServerError(error.message));
    }
  };
  
  export const getDoctors = async (req, res, next) => {
    try {
      const doctors = await getAllDoctors();
      return SuccessResponse.ok(res, doctors, 'Doctors retrieved successfully');
    } catch (error) {
      next(error instanceof ErrorResponse ? error : ErrorResponse.internalServerError(error.message));
    }
  };
  
  export const getDoctor = async (req, res, next) => {
    try {
      const doctor = await getDoctorById(req.params.id);
      return SuccessResponse.ok(res, doctor, 'Doctor retrieved successfully');
    } catch (error) {
      next(error instanceof ErrorResponse ? error : ErrorResponse.internalServerError(error.message));
    }
  };
  
  export const editDoctor = async (req, res, next) => {
    try {
      if (!req.user?.id) {
        throw ErrorResponse.unauthorized('Unauthorized access');
      }
  
      const updated = await updateDoctor(req.params.id, req.user.id, req.body);
      return SuccessResponse.ok(res, updated, 'Doctor updated successfully');
    } catch (error) {
      next(error instanceof ErrorResponse ? error : ErrorResponse.internalServerError(error.message));
    }
  };
  
  export const removeDoctor = async (req, res, next) => {
    try {
      if (!req.user?.id) {
        throw ErrorResponse.unauthorized('Unauthorized access');
      }
  
      const deleted = await deleteDoctor(req.params.id, req.user.id);
      return SuccessResponse.ok(res, deleted, 'Doctor deleted successfully');
    } catch (error) {
      next(error instanceof ErrorResponse ? error : ErrorResponse.internalServerError(error.message));
    }
  };
  