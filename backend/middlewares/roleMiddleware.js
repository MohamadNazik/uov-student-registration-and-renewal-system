export const checkPermission = (requiredPermission) => {
  return async (req, res, next) => {
    const admin = await Admin.findById(req.user._id);

    if (!admin) {
      return res.status(404).send({
        success: false,
        message: "Admin not found",
      });
    }
    const hasPermission = admin.permissions.includes(requiredPermission);

    if (!hasPermission) {
      return res.status(403).send({
        success: false,
        message: "You do not have permission to access this resource.",
      });
    }

    next();
  };
};
