export const checkPermission = (requiredPermission) => {
  return async (req, res, next) => {
    const admin = req.admin;

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
