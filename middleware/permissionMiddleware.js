const { t } = require("i18next");
const Permission = require("../models/Permission");
const RolePermission = require("../models/RolePermission");

const hasPermission = (...permissionKeys) => {
  return async (req, res, next) => {
    try {
      const role_id = req.user?.role_id;

      if (!role_id) {
        return res.status(403).json({ message: t("role_id_required") });
      }

      // 1. Get all permissions
      const permissionModel = new Permission();
      const allPermissions = await permissionModel.getAll();

      // 2. Match permissions by keys
      const permissions = allPermissions.filter((p) =>
        permissionKeys.includes(p.permission_key)
      );

      if (permissions.length === 0) {
        return res.status(403).json({ message: t("permission_not_found") });
      }

      // 3. Get role-permission links
      const rolePermissionModel = new RolePermission();
      const rolePermissions = await rolePermissionModel.findByRoleId(role_id); // no populate!

      // 4. Compare permission IDs
      const requiredPermissionIds = permissions.map((p) => p._id.toString());

      let hasAccess = false;
      for (const rp of rolePermissions) {
        const rpPermissionId =
          typeof rp.permission_id === "object"
            ? rp.permission_id._id?.toString() || rp.permission_id.toString()
            : rp.permission_id?.toString();

        if (requiredPermissionIds.includes(rpPermissionId)) {
          hasAccess = true;
          break;
        }
      }

      if (hasAccess) {
        return next();
      }

      return res.status(403).json({ message: t("unauthorized_access") });
    } catch (err) {
      console.error("Permission check error:", err);
      return res
        .status(500)
        .json({ message: t("server_error"), error: err.message });
    }
  };
};

module.exports = hasPermission;
