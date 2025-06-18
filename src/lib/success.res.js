
export class SuccessResponse {
    static ok(res, data = {}, message = 'Data retrieved successfully') {
      return res.status(200).json({ success: true, message, data });
    }
  
    static created(res, data = {}, message = 'Resource created successfully') {
      return res.status(201).json({ success: true, message, data });
    }
  
    static accepted(res, data = {}, message = 'Request accepted') {
      return res.status(202).json({ success: true, message, data });
    }
  }
  