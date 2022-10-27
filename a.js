console.log(require('crypto').randomBytes(64).toString('hex'))

'/users/add',               verify_Token_Admin_Superadmin_Role,                 addNewUser
'/admins/add',              verify_Token_Superadmin_Role,                       addNewUser
'/users/:id',               verify_Token_UserId_Admin_Superadmin_Role,          getUserById
'/admins/:id',              verify_Token_AdminId_Superadmin_Role,               getUserById
'/superadmins/:id',         verify_Token_SuperadminId,                          getUserById
'/users',                   verify_Token_Admin_Superadmin_Role,                 getAllUser
'/admins',                  verify_Token_Superadmin_Role,                       getAllAdmin
'/users/edit/:id',          verify_Token_UserId_Admin_Superadmin_Role,          updateUserById
'/admins/edit/:id',         verify_Token_AdminId_Superadmin_Role,               updateUserById
'/superadmins/edit/:id',    verify_Token_SuperadminId,                          updateUserById
'/users/delete/:id',        verify_Token_UserId_Admin_Superadmin_Role,          deleteUserById
'/admins/delete/:id',       verify_Token_AdminId_Superadmin_Role,               deleteUserById
'/superadmins/delete/:id',  verify_Token_SuperadminId,                          deleteUserById